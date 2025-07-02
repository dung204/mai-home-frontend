'use client';

import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ComponentProps, ComponentRef, useRef, useState } from 'react';
import { z } from 'zod';

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
import { Button } from '@/base/components/ui/button';
import { Card, CardContent } from '@/base/components/ui/card';
import { Form } from '@/base/components/ui/form';
import { Skeleton } from '@/base/components/ui/skeleton';
import { envClient } from '@/base/config/env-client.config';
import { LocationForm } from '@/modules/location/components/location-form';
import { ImagePayload, MediaUploadResponse, VideoPayload, mediaService } from '@/modules/media';
import {
  PropertyCategory,
  UpdatePropertySchema,
  createPropertySchema,
  propertiesService,
} from '@/modules/properties';

import { AreaForm } from '../components/area-form';
import { PricePerMonthForm } from '../components/price-per-month-form';

type EditPropertyPageProps = {
  propertyId: string;
};

export function EditPropertyPage({ propertyId }: EditPropertyPageProps) {
  const {
    data: { data: property },
  } = useSuspenseQuery({
    queryKey: ['property', propertyId],
    queryFn: () => propertiesService.getPropertyById(propertyId),
  });

  const categoryFormRef = useRef<ComponentRef<typeof Form>>(null);
  const locationFormRef = useRef<ComponentRef<typeof LocationForm>>(null);
  const infoFormRef = useRef<ComponentRef<typeof Form>>(null);
  const mapFormRef = useRef<ComponentRef<typeof Form>>(null);
  const imageFormRef = useRef<ComponentRef<typeof Form>>(null);
  const pricePerMonthFormRef = useRef<ComponentRef<typeof PricePerMonthForm>>(null);
  const areaFormRef = useRef<ComponentRef<typeof AreaForm>>(null);
  const videoFormRef = useRef<ComponentRef<typeof Form>>(null);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showFailedDialog, setShowFailedDialog] = useState(false);
  const [imageIndexesToDelete, setImageIndexesToDelete] = useState<number[]>([]);
  const [videoIndexesToDelete, setVideoIndexesToDelete] = useState<number[]>([]);

  const { mutateAsync: triggerUploadFiles, isPending: isUploadingFiles } = useMutation({
    mutationFn: (payload: { files: File[]; folder?: string }) => mediaService.uploadFiles(payload),
  });

  const { mutateAsync: triggerDeleteFile, isPending: isDeletingFile } = useMutation({
    mutationFn: (payload: { name: string }) => mediaService.deleteFile(payload),
  });

  const { mutate: triggerUpdateProperty, isPending: isUpdatingProperty } = useMutation({
    mutationFn: async (payload: UpdatePropertySchema) =>
      propertiesService.updateProperty({ id: propertyId, payload }),
    onSuccess: () => {
      setShowSuccessDialog(true);
    },
  });

  const handleSubmit = async () => {
    let updatedProperty: UpdatePropertySchema = {
      id: propertyId,
    };
    let canSubmit = true;

    await categoryFormRef.current?.handleSubmit(
      (data) => {
        const { category } = data as { category: PropertyCategory };

        updatedProperty = {
          ...updatedProperty,
          ...(category !== property.category && { category }),
        };
      },
      () => {
        canSubmit = false;
      },
    )();
    await locationFormRef.current?.handleSubmit(
      (data) => {
        const { cityId, districtId, wardId, address } = data;

        updatedProperty = {
          ...updatedProperty,
          ...(cityId !== property.city.id && { cityId }),
          ...(districtId !== property.district.id && { districtId }),
          ...(wardId !== property.ward.id && { wardId }),
          ...(address !== property.address && { address }),
        };
      },
      () => {
        canSubmit = false;
      },
    )();
    await infoFormRef.current?.handleSubmit(
      (data) => {
        const { title, description } = data as Record<string, string>;

        updatedProperty = {
          ...updatedProperty,
          ...(title !== property.title && { title }),
          ...(description !== property.description && { description }),
        };
      },
      () => {
        canSubmit = false;
      },
    )();
    await pricePerMonthFormRef.current?.handleSubmit(
      (data) => {
        const { minPricePerMonth, maxPricePerMonth } = data as Record<
          string,
          'minPricePerMonth' | 'maxPricePerMonth'
        >;

        updatedProperty = {
          ...updatedProperty,
          ...(parseFloat(minPricePerMonth) !== parseFloat(property.minPricePerMonth) && {
            minPricePerMonth,
          }),
          ...(parseFloat(maxPricePerMonth) !== parseFloat(property.maxPricePerMonth) && {
            maxPricePerMonth,
          }),
        };
      },
      () => {
        canSubmit = false;
      },
    )();
    await areaFormRef.current?.handleSubmit(
      (data) => {
        const { minArea, maxArea } = data as Record<string, 'minArea' | 'maxArea'>;

        updatedProperty = {
          ...updatedProperty,
          ...(parseFloat(minArea) !== parseFloat(property.minArea) && {
            minArea,
          }),
          ...(parseFloat(maxArea) !== parseFloat(property.maxArea) && {
            maxArea,
          }),
        };
      },
      () => {
        canSubmit = false;
      },
    )();
    await mapFormRef.current?.handleSubmit(
      (data) => {
        const { position } = data as Record<string, { lat: number; lng: number }>;

        updatedProperty = {
          ...updatedProperty,
          ...(position.lat !== parseFloat(property.latitude) && {
            latitude: position.lat.toString(),
          }),
          ...(position.lng !== parseFloat(property.longitude) && {
            longitude: position.lng.toString(),
          }),
        };
      },
      () => {
        canSubmit = false;
      },
    )();
    await imageFormRef.current?.handleSubmit(
      () => {},
      () => {
        canSubmit = false;
      },
    )();
    await videoFormRef.current?.handleSubmit(
      () => {},
      () => {
        canSubmit = false;
      },
    )();

    const { id, ...updateInfo } = updatedProperty;

    if (Object.keys(updateInfo).length === 0) {
      setShowSuccessDialog(true);
      return;
    }

    if (imageFormRef.current?.getValues('images').length - imageIndexesToDelete.length < 5) {
      canSubmit = false;
      imageFormRef.current?.setError('images', {
        type: 'manual',
        message: 'Số ảnh tải lên tối thiểu là 5',
      });
    }

    if (imageFormRef.current?.getValues('images').length - imageIndexesToDelete.length > 20) {
      canSubmit = false;
      imageFormRef.current?.setError('images', {
        type: 'manual',
        message: 'Số ảnh tải lên tối đa là 20',
      });
    }

    if (videoFormRef.current?.getValues('videos').length - videoIndexesToDelete.length > 4) {
      canSubmit = false;
      videoFormRef.current?.setError('videos', {
        type: 'manual',
        message: 'Số video tải lên tối đa là 4',
      });
    }

    if (canSubmit) {
      const imageFilesToUpload =
        (imageFormRef.current
          ?.getValues('images')
          .filter((image: ImagePayload) => image.file !== null)
          .map((image: ImagePayload) => image.file) as File[]) || [];

      const videoFilesToUpload =
        (videoFormRef.current
          ?.getValues('videos')
          .filter((video: VideoPayload) => video.file !== null)
          .map((video: VideoPayload) => video.file) as File[]) || [];

      const imageFilesToDelete = imageIndexesToDelete.map((index) => ({
        name: imageFormRef.current
          ?.getValues('images')
          [index].previewUrl.replace(envClient.NEXT_PUBLIC_ASSETS_URL, ''),
      }));

      const videoFilesToDelete = videoIndexesToDelete.map((index) => ({
        name: videoFormRef.current
          ?.getValues('videos')
          [index].previewUrl.replace(envClient.NEXT_PUBLIC_ASSETS_URL, ''),
      }));

      const imageFilesToKeep = imageFormRef.current
        ?.getValues('images')
        .filter(
          (image: ImagePayload, index: number) =>
            image.file === null && !imageIndexesToDelete.includes(index),
        )
        .map((image: ImagePayload) =>
          image.previewUrl.replace(envClient.NEXT_PUBLIC_ASSETS_URL, ''),
        );

      const videoFilesToKeep = videoFormRef.current
        ?.getValues('videos')
        .filter(
          (video: VideoPayload, index: number) =>
            video.file === null && !videoIndexesToDelete.includes(index),
        )
        .map((video: VideoPayload) =>
          video.previewUrl.replace(envClient.NEXT_PUBLIC_ASSETS_URL, ''),
        );

      if (imageFilesToDelete.length > 0) {
        try {
          await Promise.all(imageFilesToDelete.map((file) => triggerDeleteFile(file)));
          updatedProperty = {
            ...updatedProperty,
            images: imageFilesToKeep.join(','),
          };
        } catch (_err) {
          setShowFailedDialog(true);
          return;
        }
      }

      if (videoFilesToDelete.length > 0) {
        try {
          await Promise.all(videoFilesToDelete.map((file) => triggerDeleteFile(file)));
          updatedProperty = {
            ...updatedProperty,
            videos: videoFilesToKeep.join(','),
          };
        } catch (_err) {
          setShowFailedDialog(true);
          return;
        }
      }

      let imageUploadResponse: MediaUploadResponse;
      let videoUploadResponse: MediaUploadResponse;

      if (imageFilesToUpload.length > 0) {
        try {
          imageUploadResponse = await triggerUploadFiles({
            folder: `properties/${propertyId}/images`,
            files: imageFilesToUpload,
          });
        } catch (_err) {
          setShowFailedDialog(true);
          return;
        }

        if (imageUploadResponse.metadata.successCount !== imageFilesToUpload.length) {
          setShowFailedDialog(true);
          return;
        }

        updatedProperty = {
          ...updatedProperty,
          images: [
            ...imageFilesToKeep,
            ...imageUploadResponse.data.map((image) => image.fileName),
          ].join(','),
        };
      }

      if (videoFilesToUpload.length > 0) {
        try {
          videoUploadResponse = await triggerUploadFiles({
            folder: `properties/${propertyId}/videos`,
            files: videoFilesToUpload,
          });
        } catch (_err) {
          setShowFailedDialog(true);
          return;
        }

        if (videoUploadResponse.metadata.successCount !== videoFilesToUpload.length) {
          setShowFailedDialog(true);
          return;
        }

        updatedProperty = {
          ...updatedProperty,
          videos: [
            ...videoFilesToKeep,
            ...videoUploadResponse.data.map((video) => video.fileName),
          ].join(','),
        };
      }

      triggerUpdateProperty(updatedProperty as UpdatePropertySchema);
    }
  };

  return (
    <>
      <Card>
        <CardContent className="grid grid-cols-2 gap-6">
          <h1 className="col-span-2 text-2xl font-medium">Chuyên mục</h1>
          <div className="xs:col-span-1 col-span-2">
            <Form
              ref={categoryFormRef}
              loading={isUpdatingProperty || isUploadingFiles || isDeletingFile}
              schema={createPropertySchema.pick({
                category: true,
              })}
              defaultValues={{
                category: property.category,
              }}
              fields={[
                {
                  name: 'category',
                  type: 'select',
                  label: 'Chọn chuyên mục',
                  placeholder: 'Chọn chuyên mục',
                  searchable: false,
                  clearable: false,
                  options: [
                    { value: PropertyCategory.ROOM, label: 'Phòng trọ' },
                    { value: PropertyCategory.HOUSE, label: 'Nhà nguyên căn' },
                    { value: PropertyCategory.APARTMENT, label: 'Chung cư mini' },
                    { value: PropertyCategory.SHARED, label: 'Ở ghép' },
                  ],
                },
              ]}
              renderSubmitButton={() => <></>}
              onSuccessSubmit={() => {}}
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col gap-6">
          <h1 className="text-2xl font-medium">Khu vực</h1>
          <LocationForm
            ref={locationFormRef}
            defaultValues={{
              cityId: property.city.id,
              districtId: property.district.id,
              wardId: property.ward.id,
              address: property.address,
            }}
            className="xs:grid-cols-2 grid"
            onSuccessSubmit={() => {}}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col gap-6">
          <h1 className="text-2xl font-medium">Thông tin mô tả</h1>
          <Form
            ref={infoFormRef}
            loading={isUpdatingProperty || isUploadingFiles || isDeletingFile}
            schema={createPropertySchema.pick({
              title: true,
              description: true,
            })}
            defaultValues={{
              title: property.title,
              description: property.description,
            }}
            fields={[
              {
                name: 'title',
                type: 'textarea',
                label: 'Tiêu đề',
                description: '(Tối thiểu 30 ký tự, tối đa 100 ký tự)',
                placeholder: '',
                render: ({ Label, Control, Description, Message }) => (
                  <>
                    <Label />
                    <Control className="h-[4lh] resize-none" />
                    <Description />
                    <Message />
                  </>
                ),
              },
              {
                name: 'description',
                type: 'textarea',
                label: 'Mô tả',
                description: '(Tối thiểu 50 ký tự, tối đa 5000 ký tự)',
                placeholder: '',
                render: ({ Label, Control, Description, Message }) => (
                  <>
                    <Label />
                    <Control className="h-[15lh] resize-none" />
                    <Description />
                    <Message />
                  </>
                ),
              },
            ]}
            renderSubmitButton={() => <></>}
            onSuccessSubmit={() => {}}
          />
          <PricePerMonthForm
            ref={pricePerMonthFormRef}
            loading={isUpdatingProperty || isUploadingFiles || isDeletingFile}
            defaultValues={{
              minPricePerMonth: property.minPricePerMonth,
              maxPricePerMonth: property.maxPricePerMonth,
            }}
          />
          <AreaForm
            ref={areaFormRef}
            loading={isUpdatingProperty || isUploadingFiles || isDeletingFile}
            defaultValues={{
              minArea: property.minArea,
              maxArea: property.maxArea,
            }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-medium">Vị trí bản đồ</h1>
            <p>Click vào một ví trí trên bản đồ để đánh dấu vị trí</p>
          </div>
          <Form
            ref={mapFormRef}
            loading={isUpdatingProperty || isUploadingFiles || isDeletingFile}
            schema={z.object({
              position: z.object(
                {
                  lat: z.number(),
                  lng: z.number(),
                },
                { message: 'Vui lòng chọn một vị trí trên bản đồ' },
              ),
            })}
            defaultValues={{
              position: {
                lat: parseFloat(property.latitude),
                lng: parseFloat(property.longitude),
              },
            }}
            fields={[
              {
                name: 'position',
                type: 'map',

                // Initially show the map centered, zoomed out so that the whole Vietnam is visible
                center: [parseFloat(property.latitude), parseFloat(property.longitude)],
                zoom: 13,

                scrollWheelZoom: 'center',
                render: ({ Control, Message }) => (
                  <>
                    <Control />
                    <Message />
                  </>
                ),
              },
            ]}
            onSuccessSubmit={() => {}}
            renderSubmitButton={() => <></>}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-6">
          <h1 className="text-2xl font-medium">Hình ảnh</h1>
          <Form
            ref={imageFormRef}
            loading={isUpdatingProperty || isUploadingFiles || isDeletingFile}
            schema={z.object({
              images: z
                .array(
                  z.object({
                    file: z.any(),
                    previewUrl: z.string(),
                  }),
                )
                .min(5, 'Số ảnh tải lên tối thiểu là 5')
                .max(20, 'Số ảnh tải lên tối đa là 20'),
            })}
            defaultValues={{
              images: property.images.map((imageUrl) => ({
                file: null,
                previewUrl: `${envClient.NEXT_PUBLIC_ASSETS_URL}${imageUrl}`,
              })),
            }}
            fields={[
              {
                name: 'images',
                type: 'image',
                description: '(Tải lên tối thiểu 5 ảnh, tối đa 20 ảnh)',
                indexesToDelete: imageIndexesToDelete,
                onIndexesToDeleteChange: setImageIndexesToDelete,
                render: ({ Control, Description, Message }) => (
                  <>
                    <Control />
                    <Description />
                    <Message />
                  </>
                ),
              },
            ]}
            onSuccessSubmit={() => {}}
            renderSubmitButton={() => <></>}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-6">
          <h1 className="text-2xl font-medium">Video</h1>
          <Form
            ref={videoFormRef}
            schema={z.object({
              videos: z
                .array(
                  z.object({
                    file: z.any(),
                    previewUrl: z.string(),
                  }),
                )
                .max(4, 'Số ảnh tải lên tối đa là 4'),
            })}
            defaultValues={{
              videos: property.videos.map((videoUrl) => ({
                file: null,
                previewUrl: `${envClient.NEXT_PUBLIC_ASSETS_URL}${videoUrl}`,
              })),
            }}
            fields={[
              {
                name: 'videos',
                type: 'video',
                description: '(Tải lên tối đa 4 video)',
                indexesToDelete: videoIndexesToDelete,
                onIndexesToDeleteChange: setVideoIndexesToDelete,
                render: ({ Control, Description, Message }) => (
                  <>
                    <Control />
                    <Description />
                    <Message />
                  </>
                ),
              },
            ]}
            onSuccessSubmit={() => {}}
            renderSubmitButton={() => <></>}
          />
        </CardContent>
      </Card>

      <div className="flex w-full justify-center">
        <Button
          className="rounded-full p-6! text-base"
          onClick={handleSubmit}
          loading={isUpdatingProperty || isUploadingFiles || isDeletingFile}
        >
          Lưu thay đổi
        </Button>
      </div>
      <SuccessAlertDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        propertyId={propertyId}
      />
      <FailedAlertDialog open={showFailedDialog} onOpenChange={setShowFailedDialog} />
    </>
  );
}

export function EditPropertyPageNotFound() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <Image src="/result-not-found.png" alt="not found" width={300} height={300} />
        <p className="w-2/3 text-center">
          Bài đăng không tồn tại hoặc đã bị xóa, hết hạn.
          <br />
          Nếu bài đăng nằm trong phần{' '}
          <Link href="/user/properties?filter=deleted" className="text-primary underline">
            Đã xóa
          </Link>
          , vui lòng khôi phục lại để chỉnh sửa.
        </p>
      </div>
    </>
  );
}

export function EditPropertyPageSkeleton() {
  return (
    <>
      <Card>
        <CardContent className="grid grid-cols-2 gap-6">
          <h1 className="col-span-2 text-2xl font-medium">Chuyên mục</h1>
          <Skeleton className="col-span-1 h-9" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col gap-6">
          <h1 className="text-2xl font-medium">Khu vực</h1>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col gap-6">
          <h1 className="text-2xl font-medium">Thông tin mô tả</h1>
          <div className="grid gap-4">
            <Skeleton className="h-[4lh]" />
            <Skeleton className="h-[15lh]" />
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-medium">Vị trí bản đồ</h1>
            <p>Click vào một ví trí trên bản đồ để đánh dấu vị trí</p>
          </div>
          <Skeleton className="h-[400px]" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-medium">Hình ảnh</h1>
          </div>
          <Skeleton className="h-[300px]" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-medium">Video</h1>
          </div>
          <Skeleton className="h-[300px]" />
        </CardContent>
      </Card>
    </>
  );
}

function SuccessAlertDialog({
  propertyId,
  ...props
}: ComponentProps<typeof AlertDialog> & { propertyId: string | undefined }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Chỉnh sửa bài thành công</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => queryClient.invalidateQueries({ queryKey: ['property', propertyId] })}
          >
            Đóng
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await queryClient.invalidateQueries({ queryKey: ['property', propertyId] });
              router.push(`/property/${propertyId}`);
            }}
          >
            Đi đến bài đăng
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function FailedAlertDialog(props: ComponentProps<typeof AlertDialog>) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Đăng bài thất bại</AlertDialogTitle>
          <AlertDialogDescription>Đã có lỗi xảy ra. Vui lòng thử lại sau.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
