'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ComponentProps, ComponentRef, useRef, useState } from 'react';
import { z } from 'zod';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/base/components/ui/alert-dialog';
import { Button } from '@/base/components/ui/button';
import { Card, CardContent } from '@/base/components/ui/card';
import { Form } from '@/base/components/ui/form';
import { cn } from '@/base/lib';
import { LocationForm } from '@/modules/location/components/location-form';
import { ImagePayload, MediaUploadResponse, VideoPayload, mediaService } from '@/modules/media';

import { propertiesService } from '../services/properties.service';
import { CreatePropertySchema, PropertyCategory, createPropertySchema } from '../types';

export function NewPropertyPage() {
  const categoryFormRef = useRef<ComponentRef<typeof Form>>(null);
  const locationFormRef = useRef<ComponentRef<typeof LocationForm>>(null);
  const infoFormRef = useRef<ComponentRef<typeof Form>>(null);
  const mapFormRef = useRef<ComponentRef<typeof Form>>(null);
  const imageFormRef = useRef<ComponentRef<typeof Form>>(null);
  const videoFormRef = useRef<ComponentRef<typeof Form>>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showFailedDialog, setShowFailedDialog] = useState(false);
  const [propertyId] = useState<string>(crypto.randomUUID());

  const { mutateAsync: triggerUploadFiles, isPending: isUploadingFiles } = useMutation({
    mutationFn: (payload: { files: File[]; folder?: string }) => mediaService.uploadFiles(payload),
  });

  const { mutate: triggerCreateProperty, isPending: isCreatingProperty } = useMutation({
    mutationFn: async (payload: CreatePropertySchema) => propertiesService.createProperty(payload),
    onSuccess: () => {
      setShowSuccessDialog(true);
    },
  });

  const handleSubmit = async () => {
    let property: Partial<CreatePropertySchema> = {
      id: propertyId,
    };
    let canSubmit = true;

    await categoryFormRef.current?.handleSubmit(
      (data) => {
        property = {
          ...property,
          ...(data as Record<string, string>),
        };
      },
      () => {
        canSubmit = false;
      },
    )();
    await locationFormRef.current?.handleSubmit(
      (data) => {
        property = {
          ...property,
          ...(data as Record<string, string>),
        };
      },
      () => {
        canSubmit = false;
      },
    )();
    await infoFormRef.current?.handleSubmit(
      (data) => {
        property = {
          ...property,
          ...(data as Record<string, string>),
        };
      },
      () => {
        canSubmit = false;
      },
    )();
    await mapFormRef.current?.handleSubmit(
      (data) => {
        const { position } = data as Record<string, { lat: number; lng: number }>;

        property = {
          ...property,
          latitude: position.lat.toString(),
          longitude: position.lng.toString(),
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

    if (canSubmit) {
      const imageFiles =
        (imageFormRef.current
          ?.getValues('images')
          .map((image: ImagePayload) => image.file) as File[]) || [];
      const videoFiles =
        (videoFormRef.current
          ?.getValues('videos')
          .map((video: VideoPayload) => video.file) as File[]) || [];

      let imageUploadResponse: MediaUploadResponse;
      let videoUploadResponse: MediaUploadResponse;

      try {
        imageUploadResponse = await triggerUploadFiles({
          folder: `images/properties/${propertyId}`,
          files: imageFiles,
        });
      } catch (_err) {
        setShowFailedDialog(true);
        return;
      }

      if (imageUploadResponse.metadata.successCount !== imageFiles.length) {
        setShowFailedDialog(true);
        return;
      }

      property = {
        ...property,
        images: imageUploadResponse.data.map((image) => image.url).join(','),
      };

      if (videoFiles.length > 0) {
        try {
          videoUploadResponse = await triggerUploadFiles({
            folder: `videos/properties/${propertyId}`,
            files: videoFiles,
          });
        } catch (_err) {
          setShowFailedDialog(true);
          return;
        }

        if (videoUploadResponse.metadata.successCount !== videoFiles.length) {
          setShowFailedDialog(true);
          return;
        }

        property = {
          ...property,
          videos: videoUploadResponse.data.map((video) => video.url).join(','),
        };
      }

      triggerCreateProperty(property as CreatePropertySchema);
    }
  };

  return (
    <>
      <Card>
        <CardContent className="grid grid-cols-2 gap-6">
          <h1 className="col-span-2 text-2xl font-medium">Chuyên mục</h1>
          <div className="col-span-1">
            <Form
              ref={categoryFormRef}
              loading={isCreatingProperty || isUploadingFiles}
              schema={createPropertySchema.pick({
                category: true,
              })}
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
            loading={isCreatingProperty || isUploadingFiles}
            schema={createPropertySchema.pick({
              title: true,
              description: true,
              pricePerMonth: true,
              area: true,
            })}
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
              {
                name: 'pricePerMonth',
                type: 'text',
                label: 'Giá thuê/tháng',
                placeholder: 'Nhập đầy đủ số dương, ví dụ 1 triệu nhập là 1000000',
                render: ({ Label, Control, Description, Message }) => (
                  <>
                    <Label />
                    <div
                      className={cn(
                        'border-input flex items-center rounded-md border transition-all',
                        'has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 has-[input:focus-visible]:ring-[3px]',
                        'has-[input[aria-invalid="true"]]:ring-danger/20 dark:has-[input[aria-invalid="true"]]:ring-danger/40 has-[input[aria-invalid="true"]]:border-danger',
                      )}
                    >
                      <Control className="rounded-none border-0 text-base! shadow-none ring-0 focus-visible:ring-0" />
                      <div className="flex h-full items-center border-l px-4 text-sm">
                        VNĐ/tháng
                      </div>
                    </div>
                    <Description />
                    <Message />
                  </>
                ),
              },
              {
                name: 'area',
                type: 'text',
                label: 'Diện tích',
                placeholder: 'Nhập diện tích',
                render: ({ Label, Control, Description, Message }) => (
                  <>
                    <Label />
                    <div
                      className={cn(
                        'border-input flex items-center rounded-md border transition-all',
                        'has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 has-[input:focus-visible]:ring-[3px]',
                        'has-[input[aria-invalid="true"]]:ring-danger/20 dark:has-[input[aria-invalid="true"]]:ring-danger/40 has-[input[aria-invalid="true"]]:border-danger',
                      )}
                    >
                      <Control className="rounded-none border-0 text-base! shadow-none ring-0 focus-visible:ring-0" />
                      <div className="flex h-full items-center border-l px-4 text-sm">
                        m<sup>2</sup>
                      </div>
                    </div>
                    <Description />
                    <Message />
                  </>
                ),
              },
            ]}
            renderSubmitButton={() => <></>}
            onSuccessSubmit={() => {}}
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
            schema={z.object({
              position: z.object(
                {
                  lat: z.number(),
                  lng: z.number(),
                },
                { message: 'Vui lòng chọn một vị trí trên bản đồ' },
              ),
            })}
            fields={[
              {
                name: 'position',
                type: 'map',

                // Initially show the map centered, zoomed out so that the whole Vietnam is visible
                center: [14.0583, 108.2772],
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
            fields={[
              {
                name: 'images',
                type: 'image',
                description: '(Tải lên tối thiểu 5 ảnh, tối đa 20 ảnh)',
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
            fields={[
              {
                name: 'videos',
                type: 'video',
                description: '(Tải lên tối đa 4 video)',
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
          loading={isCreatingProperty || isUploadingFiles}
        >
          Đăng tin
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

function SuccessAlertDialog({
  propertyId,
  ...props
}: ComponentProps<typeof AlertDialog> & { propertyId: string | undefined }) {
  const router = useRouter();

  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Đăng bài thành công</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => router.push(`/property/${propertyId}`)}>
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
