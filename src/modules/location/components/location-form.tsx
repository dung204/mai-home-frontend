'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Ref, useImperativeHandle, useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/base/components/ui/form';
import { Input } from '@/base/components/ui/input';
import { Select } from '@/base/components/ui/select';
import { cn } from '@/base/lib';

import { cities } from '../constants/cities.constant';
import { districts } from '../constants/districts.constant';
import { wards } from '../constants/wards.constant';
import { LocationFormPayload, locationFormSchema } from '../types';

type LocationFormProps = {
  ref?: Ref<UseFormReturn<LocationFormPayload, unknown, LocationFormPayload>>;
  onSuccessSubmit: SubmitHandler<LocationFormPayload>;
  onErrorSubmit?: SubmitErrorHandler<LocationFormPayload>;
  className?: string;
  defaultValues?: LocationFormPayload;
};

export function LocationForm({
  ref,
  className,
  defaultValues,
  onSuccessSubmit,
  onErrorSubmit,
}: LocationFormProps) {
  const form = useForm({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      cityId: defaultValues?.cityId ?? '',
      districtId: defaultValues?.districtId ?? '',
      wardId: defaultValues?.wardId ?? '',
      address: defaultValues?.address ?? '',
    },
  });

  const [districtVersion, setDistrictVersion] = useState(0);
  const [wardVersion, setWardVersion] = useState(0);

  const cityId = form.watch('cityId');
  const districtId = form.watch('districtId');

  useImperativeHandle(ref, () => form, [form]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSuccessSubmit, onErrorSubmit)}
        className={cn('grid gap-4', className)}
      >
        <FormField key="city" name="city">
          <FormItem>
            <FormLabel required>Tỉnh/Thành phố</FormLabel>
            <Controller
              control={form.control}
              name="cityId"
              render={({ field, fieldState: { error } }) => (
                <Select
                  options={cities.map((city) => ({
                    value: city.id,
                    label: city.name,
                  }))}
                  clearable={false}
                  placeholder="Chọn Tỉnh/Thành phố"
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    form.setValue('districtId', '');
                    form.setValue('wardId', '');
                    setDistrictVersion((prev) => prev + 1);
                    setWardVersion((prev) => prev + 1);
                  }}
                  triggerClassName={cn({
                    'ring-danger/20! dark:ring-danger/40! border-danger!': !!error,
                  })}
                />
              )}
            />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField key="district" name="district">
          <FormItem>
            <FormLabel required>Quận/Huyện</FormLabel>
            <Controller
              control={form.control}
              name="districtId"
              render={({ field, fieldState: { error } }) => (
                <Select
                  key={districtVersion}
                  options={
                    !cityId
                      ? []
                      : districts
                          .filter((district) => district.cityId === cityId)
                          .map((district) => ({
                            value: district.id,
                            label: district.name,
                          }))
                  }
                  clearable={false}
                  placeholder="Chọn Quận/Huyện"
                  disabled={!cityId}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                    form.setValue('wardId', '');
                    setWardVersion((prev) => prev + 1);
                  }}
                  triggerClassName={cn({
                    'ring-danger/20! dark:ring-danger/40! border-danger!': !!error,
                  })}
                />
              )}
            />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField key="ward" name="ward">
          <FormItem>
            <FormLabel required>Phường/Xã</FormLabel>
            <Controller
              control={form.control}
              name="wardId"
              render={({ field, fieldState: { error } }) => (
                <Select
                  key={wardVersion}
                  options={
                    !districtId
                      ? []
                      : wards
                          .filter((ward) => ward.districtId === districtId)
                          .map((ward) => ({
                            value: ward.id,
                            label: ward.name,
                          }))
                  }
                  placeholder="Chọn Phường/Xã"
                  disabled={!districtId}
                  value={field.value}
                  onChange={field.onChange}
                  triggerClassName={cn({
                    'ring-danger/20! dark:ring-danger/40! border-danger!': !!error,
                  })}
                />
              )}
            />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField key="address" name="address">
          <FormItem>
            <FormLabel>Địa chỉ</FormLabel>
            <FormControl>
              <Input {...form.register('address')} placeholder="Nhập địa chỉ" className="w-full" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
    </FormProvider>
  );
}
