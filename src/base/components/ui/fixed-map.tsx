import { divIcon } from 'leaflet';
import Link from 'next/link';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

interface FixedMapProps {
  position: [number, number];
}

// eslint-disable-next-line no-restricted-syntax
export default function FixedMap({ position }: FixedMapProps) {
  return (
    <MapContainer
      className="h-[400px]"
      center={position}
      zoom={16}
      scrollWheelZoom="center"
      dragging={false}
    >
      <TileLayer
        attribution='&copy; Bản quyền thuộc về <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        icon={divIcon({
          html: '<svg width="20" height="20" viewport="0 0 20 20"><circle cx="10" cy="10" r="10" style="fill:white"/><circle cx="10" cy="10" r="7" style="fill:none;stroke:currentColor;stroke-width:2px"/><circle cx="10" cy="10" r="4" style="fill:currentColor"/></svg>',
          iconAnchor: [10, 10],
          className: '',
        })}
        position={position}
      >
        <Popup>
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${position[0]},${position[1]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Nhấn để xem trên Google Maps
          </Link>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
