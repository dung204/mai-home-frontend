'use client';

import { FilterIcon, HotelIcon, HouseIcon, UsersRoundIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/base/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/base/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/base/components/ui/drawer';
import { Input } from '@/base/components/ui/input';
import { ScrollArea } from '@/base/components/ui/scroll-area';
import { Select } from '@/base/components/ui/select';
import { useIsMobile } from '@/base/hooks';
import { cities, districts, wards } from '@/modules/location';

import { PropertyCategory, propertySearchParamsSchema } from '../types';

export function PropertiesFilter() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') ?? undefined);
  const [city, setCity] = useState(searchParams.get('city') ?? undefined);
  const [district, setDistrict] = useState(searchParams.get('district') ?? undefined);
  const [ward, setWard] = useState(searchParams.get('ward') ?? undefined);
  const [cityVersion, setCityVersion] = useState(0);
  const [districtVersion, setDistrictVersion] = useState(0);
  const [wardVersion, setWardVersion] = useState(0);
  const [minPricePerMonth, setMinPricePerMonth] = useState(
    searchParams.get('minPricePerMonth') ?? undefined,
  );
  const [maxPricePerMonth, setMaxPricePerMonth] = useState(
    searchParams.get('maxPricePerMonth') ?? undefined,
  );
  const [minArea, setMinArea] = useState(searchParams.get('minArea') ?? undefined);
  const [maxArea, setMaxArea] = useState(searchParams.get('maxArea') ?? undefined);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setCategory(searchParams.get('category') ?? undefined);
      setCity(searchParams.get('city') ?? undefined);
      setDistrict(searchParams.get('district') ?? undefined);
      setWard(searchParams.get('ward') ?? undefined);
      setCityVersion((prev) => prev + 1);
      setDistrictVersion((prev) => prev + 1);
      setWardVersion((prev) => prev + 1);
      setMinPricePerMonth(searchParams.get('minPricePerMonth') ?? undefined);
      setMaxPricePerMonth(searchParams.get('maxPricePerMonth') ?? undefined);
      setMinArea(searchParams.get('minArea') ?? undefined);
      setMaxArea(searchParams.get('maxArea') ?? undefined);
    }
  };

  const handleApply = async () => {
    const queryParams = new URLSearchParams(
      propertySearchParamsSchema.parse({
        category,
        city,
        district,
        ward,
        minPricePerMonth,
        maxPricePerMonth,
        minArea,
        maxArea,
      }) as Record<string, string>,
    );
    router.push(`${pathname}?${queryParams.toString()}`);
  };

  if (isMobile) {
    return (
      <Drawer onOpenChange={handleOpenChange}>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <FilterIcon />
            Bộ lọc
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[100dvh] pb-8">
          <DrawerHeader>
            <DrawerTitle className="text-2xl">Bộ lọc</DrawerTitle>
          </DrawerHeader>
          <div className="flex grow flex-col justify-between">
            <ScrollArea className="h-[70dvh]">
              <div className="flex flex-col gap-8 px-8">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">Chuyên mục</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={category === PropertyCategory.ROOM ? 'default' : 'outline'}
                      className="w-fit"
                      onClick={() =>
                        setCategory(
                          category === PropertyCategory.ROOM ? undefined : PropertyCategory.ROOM,
                        )
                      }
                    >
                      <HouseIcon />
                      Phòng trọ
                    </Button>
                    <Button
                      variant={category === PropertyCategory.HOUSE ? 'default' : 'outline'}
                      className="w-fit"
                      onClick={() =>
                        setCategory(
                          category === PropertyCategory.HOUSE ? undefined : PropertyCategory.HOUSE,
                        )
                      }
                    >
                      <HouseIcon />
                      Nhà nguyên căn
                    </Button>
                    <Button
                      variant={category === PropertyCategory.APARTMENT ? 'default' : 'outline'}
                      className="w-fit"
                      onClick={() =>
                        setCategory(
                          category === PropertyCategory.APARTMENT
                            ? undefined
                            : PropertyCategory.APARTMENT,
                        )
                      }
                    >
                      <HotelIcon />
                      Chung cư mini
                    </Button>
                    <Button
                      variant={category === PropertyCategory.SHARED ? 'default' : 'outline'}
                      className="w-fit"
                      onClick={() =>
                        setCategory(
                          category === PropertyCategory.SHARED
                            ? undefined
                            : PropertyCategory.SHARED,
                        )
                      }
                    >
                      <UsersRoundIcon />Ở ghép
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">Khu vực</h3>
                  <div className="xs:grid-cols-2 grid gap-2 sm:grid-cols-3">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="city" className="text-sm font-medium">
                        Thành phố
                      </label>
                      <Select
                        key={cityVersion}
                        options={cities.map((city) => ({
                          value: city.id,
                          label: city.name,
                        }))}
                        placeholder="Chọn thành phố"
                        value={city}
                        onChange={(value) => {
                          setCity(value === '' ? undefined : value);
                          setDistrict(undefined);
                          setWard(undefined);
                          setDistrictVersion((prev) => prev + 1);
                          setWardVersion((prev) => prev + 1);
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="district" className="text-sm font-medium">
                        Quận/Huyện
                      </label>
                      <Select
                        key={districtVersion}
                        options={
                          !city
                            ? []
                            : districts
                                .filter((district) => district.cityId === city)
                                .map((district) => ({
                                  value: district.id,
                                  label: district.name,
                                }))
                        }
                        placeholder="Chọn quận/huyện"
                        disabled={!city}
                        value={district}
                        onChange={(value) => {
                          setDistrict(value === '' ? undefined : value);
                          setWard(undefined);
                          setWardVersion((prev) => prev + 1);
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="ward" className="text-sm font-medium">
                        Phường/Xã
                      </label>
                      <Select
                        key={wardVersion}
                        options={
                          !district
                            ? []
                            : wards
                                .filter((ward) => ward.districtId === district)
                                .map((ward) => ({
                                  value: ward.id,
                                  label: ward.name,
                                }))
                        }
                        placeholder="Chọn phường/xã"
                        disabled={!district}
                        value={ward}
                        onChange={(value) => {
                          setWard(value === '' ? undefined : value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">Giá thuê 1 tháng</h3>
                  <div className="xs:grid-cols-2 grid gap-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="ward" className="text-sm font-medium">
                        Giá tối thiểu (VNĐ)
                      </label>
                      <Input
                        value={minPricePerMonth}
                        onChange={(e) =>
                          setMinPricePerMonth(e.target.value === '' ? undefined : e.target.value)
                        }
                        placeholder="Nhập đầy đủ số dương, ví dụ 1 triệu nhập là 1000000"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="ward" className="text-sm font-medium">
                        Giá tối đa (VNĐ)
                      </label>
                      <Input
                        value={maxPricePerMonth}
                        onChange={(e) =>
                          setMaxPricePerMonth(e.target.value === '' ? undefined : e.target.value)
                        }
                        placeholder="Nhập đầy đủ số dương, ví dụ 1 triệu nhập là 1000000"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">Diện tích</h3>
                  <div className="xs:grid-cols-2 grid gap-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="ward" className="text-sm font-medium">
                        Diện tích tối thiểu (m²)
                      </label>
                      <Input
                        value={minArea}
                        onChange={(e) =>
                          setMinArea(e.target.value === '' ? undefined : e.target.value)
                        }
                        placeholder="Nhập đầy đủ số dương, ví dụ 1 triệu nhập là 1000000"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="ward" className="text-sm font-medium">
                        Diện tích tối đa (m²)
                      </label>
                      <Input
                        value={maxArea}
                        onChange={(e) =>
                          setMaxArea(e.target.value === '' ? undefined : e.target.value)
                        }
                        placeholder="Nhập đầy đủ số dương, ví dụ 1 triệu nhập là 1000000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DrawerClose className="space-y-4 px-8">
              <Button className="w-full" variant="outline">
                Hủy
              </Button>
              <Button className="w-full" onClick={handleApply}>
                Áp dụng
              </Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog onOpenChange={handleOpenChange} modal={true}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FilterIcon />
          Bộ lọc
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Bộ lọc</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Chuyên mục</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={category === PropertyCategory.ROOM ? 'default' : 'outline'}
                className="w-fit"
                onClick={() =>
                  setCategory(
                    category === PropertyCategory.ROOM ? undefined : PropertyCategory.ROOM,
                  )
                }
              >
                <HouseIcon />
                Phòng trọ
              </Button>
              <Button
                variant={category === PropertyCategory.HOUSE ? 'default' : 'outline'}
                className="w-fit"
                onClick={() =>
                  setCategory(
                    category === PropertyCategory.HOUSE ? undefined : PropertyCategory.HOUSE,
                  )
                }
              >
                <HouseIcon />
                Nhà nguyên căn
              </Button>
              <Button
                variant={category === PropertyCategory.APARTMENT ? 'default' : 'outline'}
                className="w-fit"
                onClick={() =>
                  setCategory(
                    category === PropertyCategory.APARTMENT
                      ? undefined
                      : PropertyCategory.APARTMENT,
                  )
                }
              >
                <HotelIcon />
                Chung cư mini
              </Button>
              <Button
                variant={category === PropertyCategory.SHARED ? 'default' : 'outline'}
                className="w-fit"
                onClick={() =>
                  setCategory(
                    category === PropertyCategory.SHARED ? undefined : PropertyCategory.SHARED,
                  )
                }
              >
                <UsersRoundIcon />Ở ghép
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Khu vực</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="city" className="text-sm font-medium">
                  Thành phố
                </label>
                <Select
                  key={cityVersion}
                  options={cities.map((city) => ({
                    value: city.id,
                    label: city.name,
                  }))}
                  placeholder="Chọn thành phố"
                  value={city}
                  onChange={(value) => {
                    setCity(value === '' ? undefined : value);
                    setDistrict(undefined);
                    setWard(undefined);
                    setDistrictVersion((prev) => prev + 1);
                    setWardVersion((prev) => prev + 1);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="district" className="text-sm font-medium">
                  Quận/Huyện
                </label>
                <Select
                  key={districtVersion}
                  options={
                    !city
                      ? []
                      : districts
                          .filter((district) => district.cityId === city)
                          .map((district) => ({
                            value: district.id,
                            label: district.name,
                          }))
                  }
                  placeholder="Chọn quận/huyện"
                  disabled={!city}
                  value={district}
                  onChange={(value) => {
                    setDistrict(value === '' ? undefined : value);
                    setWard(undefined);
                    setWardVersion((prev) => prev + 1);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="ward" className="text-sm font-medium">
                  Phường/Xã
                </label>
                <Select
                  key={wardVersion}
                  options={
                    !district
                      ? []
                      : wards
                          .filter((ward) => ward.districtId === district)
                          .map((ward) => ({
                            value: ward.id,
                            label: ward.name,
                          }))
                  }
                  placeholder="Chọn phường/xã"
                  disabled={!district}
                  value={ward}
                  onChange={(value) => {
                    setWard(value === '' ? undefined : value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Giá thuê 1 tháng</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="ward" className="text-sm font-medium">
                  Giá tối thiểu (VNĐ)
                </label>
                <Input
                  value={minPricePerMonth}
                  onChange={(e) =>
                    setMinPricePerMonth(e.target.value === '' ? undefined : e.target.value)
                  }
                  placeholder="Nhập đầy đủ số dương, ví dụ 1 triệu nhập là 1000000"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="ward" className="text-sm font-medium">
                  Giá tối đa (VNĐ)
                </label>
                <Input
                  value={maxPricePerMonth}
                  onChange={(e) =>
                    setMaxPricePerMonth(e.target.value === '' ? undefined : e.target.value)
                  }
                  placeholder="Nhập đầy đủ số dương, ví dụ 1 triệu nhập là 1000000"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Diện tích</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="ward" className="text-sm font-medium">
                  Diện tích tối thiểu (m²)
                </label>
                <Input
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value === '' ? undefined : e.target.value)}
                  placeholder="Nhập đầy đủ số dương, ví dụ 1 triệu nhập là 1000000"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="ward" className="text-sm font-medium">
                  Diện tích tối đa (m²)
                </label>
                <Input
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value === '' ? undefined : e.target.value)}
                  placeholder="Nhập đầy đủ số dương, ví dụ 1 triệu nhập là 1000000"
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={() => handleApply()}>
              Áp dụng
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
