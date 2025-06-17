import { LatLng, Map, divIcon } from 'leaflet';
import { LocateFixed, Trash2 } from 'lucide-react';
import { ComponentProps, useImperativeHandle, useRef } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import Control from 'react-leaflet-custom-control';

import { cn } from '@/base/lib';

import { Button } from './button';

interface MapLocationPickerProps extends ComponentProps<typeof MapContainer> {
  position?: LatLng;
  onPositionChange?: (position: LatLng | undefined) => void;
}

// eslint-disable-next-line no-restricted-syntax
export default function MapLocationPicker({
  position,
  onPositionChange,
  className,
  ...props
}: MapLocationPickerProps) {
  const mapMarkerRef = useRef<Map>(null);

  return (
    <div className="space-y-4">
      <MapContainer {...props} className={cn('h-[400px]', className)}>
        <TileLayer
          attribution='&copy; Bản quyền thuộc về <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapMarker ref={mapMarkerRef} position={position} onPositionChange={onPositionChange} />
        <GetCurrentPosition />
      </MapContainer>
      <div className="flex w-full justify-center gap-4">
        <Button
          variant="success"
          onClick={() => {
            mapMarkerRef.current?.locate().on('locationfound', (e) => {
              onPositionChange?.(e.latlng);
              mapMarkerRef.current?.flyTo(e.latlng, mapMarkerRef.current?.getZoom());
              mapMarkerRef.current?.off('locationfound');
            });
          }}
        >
          <LocateFixed />
          Lấy vị trí của bạn
        </Button>
        {position && (
          <Button
            variant="danger"
            onClick={() => {
              onPositionChange?.(undefined);
            }}
          >
            <Trash2 />
            Xóa vị trí đã chọn
          </Button>
        )}
      </div>
    </div>
  );
}

type MapMarkerProps = {
  ref?: React.Ref<Map>;
  position?: LatLng;
  onPositionChange?: (position: LatLng) => void;
};

function MapMarker({ ref, position, onPositionChange }: MapMarkerProps) {
  const map = useMapEvents({
    click(e) {
      onPositionChange?.(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    locationfound(e) {
      onPositionChange?.(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useImperativeHandle(ref, () => map, [map]);

  return (
    position && (
      <Marker
        icon={divIcon({
          html: '<svg width="20" height="20" viewport="0 0 20 20"><circle cx="10" cy="10" r="10" style="fill:white"/><circle cx="10" cy="10" r="7" style="fill:none;stroke:currentColor;stroke-width:2px"/><circle cx="10" cy="10" r="4" style="fill:currentColor"/></svg>',
          iconAnchor: [10, 10],
          className: '',
        })}
        position={position}
      />
    )
  );
}

function GetCurrentPosition() {
  const map = useMap();

  return (
    <Control prepend position="bottomright">
      <Button
        size="icon"
        variant="outline"
        title="Lấy vị trí hiện tại"
        onClick={() => {
          map.locate().on('locationfound', (e) => {
            map.flyTo(e.latlng, map.getZoom());
            map.off('locationfound');
          });
        }}
      >
        <LocateFixed />
      </Button>
    </Control>
  );
}
