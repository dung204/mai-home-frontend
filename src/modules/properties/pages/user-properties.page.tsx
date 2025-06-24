'use client';

import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps, useState } from 'react';
import { toast } from 'sonner';

import { Pagination, PaginationSkeleton } from '@/base/components/layout/pagination';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/base/components/ui/alert-dialog';
import { buttonVariantsFn } from '@/base/components/ui/button';
import { User } from '@/modules/users';

import { PropertiesFilter } from '../components/properties-filter';
import { VerticalPropertyCard, VerticalPropertyCardSkeleton } from '../components/property-card';
import { propertiesService } from '../services/properties.service';
import { PropertySearchParams, propertyCategories } from '../types';

interface UserPropertiesPageProps {
  user: User;
  searchParams: PropertySearchParams & {
    filter?: 'active' | 'deleted';
  };
}

export function UserPropertiesPage({ user, searchParams }: UserPropertiesPageProps) {
  const queryClient = useQueryClient();
  const {
    data: {
      data: properties,
      metadata: { pagination },
    },
  } = useSuspenseQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey:
      searchParams.filter === 'deleted'
        ? ['properties', 'all', 'deleted', { owner: user.id, ...searchParams }]
        : ['properties', 'all', { owner: user.id, ...searchParams }],
    queryFn: () =>
      searchParams.filter === 'deleted'
        ? propertiesService.getAllDeletedProperties(searchParams)
        : propertiesService.getAllProperties({
            owner: user.id,
            ...searchParams,
          }),
  });

  const { mutate: triggerDeleteProperty } = useMutation({
    mutationFn: (id: string) => propertiesService.deleteProperty(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['properties', 'all'] });
      toast.success('Xóa tin đăng thành công');
    },
  });

  const { mutate: triggerRestoreProperty } = useMutation({
    mutationFn: (id: string) => propertiesService.restoreProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties', 'all'] });
      toast.success('Khôi phục tin đăng thành công');
    },
  });

  const [propertyIdToDelete, setPropertyIdToDelete] = useState<string>('');
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showRestoreAlert, setShowRestoreAlert] = useState(false);
  const [propertyIdToRestore, setPropertyIdToRestore] = useState<string>('');

  if (!properties || properties.length === 0) {
    return (
      <>
        <div className="flex items-center justify-between px-10">
          <span>{getTitle(searchParams)}</span>
          <PropertiesFilter key={JSON.stringify(searchParams)} />
        </div>
        <div className="flex flex-col items-center gap-4">
          <Image src="/result-not-found.png" alt="not found" width={300} height={300} />
          <p className="w-2/3 text-center">
            Hiện tại bạn chưa có tin đăng nào.
            <br />
            Nhấn{' '}
            <Link href="/user/properties/new" className="text-blue-500 underline">
              vào đây
            </Link>{' '}
            để bắt đầu đăng tin.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between px-10">
        <span>{getTitle(searchParams)}</span>
        <PropertiesFilter key={JSON.stringify(searchParams)} />
      </div>
      <div className="grid gap-6 px-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties.map((property) => (
          <div key={property.id}>
            <VerticalPropertyCard
              property={property}
              withControls
              onDelete={(id) => {
                setPropertyIdToDelete(id);
                setShowDeleteAlert(true);
              }}
              onRestore={(id) => {
                setPropertyIdToRestore(id);
                setShowRestoreAlert(true);
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Pagination pagination={pagination} />
      </div>
      <ConfirmDeleteAlertDialog
        propertyId={propertyIdToDelete}
        open={showDeleteAlert}
        onOpenChange={setShowDeleteAlert}
        onDelete={(propertyId) => triggerDeleteProperty(propertyId)}
      />
      <ConfirmRestoreAlertDialog
        propertyId={propertyIdToRestore}
        open={showRestoreAlert}
        onOpenChange={setShowRestoreAlert}
        onRestore={(propertyId) => triggerRestoreProperty(propertyId)}
      />
    </>
  );
}

function getTitle(searchParams: PropertySearchParams & { filter?: 'active' | 'deleted' }): string {
  const category = searchParams.category ? ` ${propertyCategories[searchParams.category]}` : '';

  const categoryTitle = `Đang hiện tất cả bài đăng${category.toLowerCase()}${searchParams.filter === 'deleted' ? ' đã xóa' : ' đang hoạt động'}`;
  let priceTitle = '';
  let areaTitle = '';

  const moneyFormatter = new Intl.NumberFormat('vi-VN', { currency: 'VND', style: 'currency' });

  if (
    searchParams.minPricePerMonth &&
    Number(searchParams.minPricePerMonth) !== 0 &&
    searchParams.maxPricePerMonth
  ) {
    priceTitle = `, giá từ ${moneyFormatter.format(Number(searchParams.minPricePerMonth))} đến ${moneyFormatter.format(Number(searchParams.maxPricePerMonth))}`;
  } else if (searchParams.minPricePerMonth && Number(searchParams.minPricePerMonth) !== 0) {
    priceTitle = `, giá từ ${moneyFormatter.format(Number(searchParams.minPricePerMonth))}`;
  } else if (searchParams.maxPricePerMonth) {
    priceTitle = `, giá dưới ${moneyFormatter.format(Number(searchParams.maxPricePerMonth))}`;
  }

  if (searchParams.minArea && Number(searchParams.minArea) !== 0 && searchParams.maxArea) {
    areaTitle = `, diện tích từ ${searchParams.minArea} đến ${searchParams.maxArea}m²`;
  } else if (searchParams.minArea && Number(searchParams.minArea) !== 0) {
    areaTitle = `, diện tích từ ${searchParams.minArea}m²`;
  } else if (searchParams.maxArea) {
    areaTitle = `, diện tích dưới ${searchParams.maxArea}m²`;
  }

  return `${categoryTitle}${priceTitle}${areaTitle}`;
}

export function UserPropertiesPageSkeleton() {
  return (
    <>
      <div className="grid gap-6 px-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map(() => (
          <div key={crypto.randomUUID()}>
            <VerticalPropertyCardSkeleton />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <PaginationSkeleton />
      </div>
    </>
  );
}

interface ConfirmDeleteAlertDialogProps extends ComponentProps<typeof AlertDialog> {
  propertyId: string;
  onDelete?: (propertyId: string) => void;
}

function ConfirmDeleteAlertDialog({
  propertyId,
  onDelete,
  ...props
}: ConfirmDeleteAlertDialogProps) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc muốn xóa tin đăng không?</AlertDialogTitle>
          <AlertDialogDescription>
            Tin đăng sẽ được đưa vào danh sách &quot;Bị xóa&quot;. Bạn có thể lựa chọn khôi phục
            trong vòng 30 ngày kể từ khi xóa
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onDelete?.(propertyId)}
            className={buttonVariantsFn({ variant: 'danger' })}
          >
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface ConfirmRestoreAlertDialogProps extends ComponentProps<typeof AlertDialog> {
  propertyId: string;
  onRestore?: (propertyId: string) => void;
}

function ConfirmRestoreAlertDialog({
  propertyId,
  onRestore,
  ...props
}: ConfirmRestoreAlertDialogProps) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn khôi phục tin đăng không?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onRestore?.(propertyId)}
            className={buttonVariantsFn({ variant: 'success' })}
          >
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
