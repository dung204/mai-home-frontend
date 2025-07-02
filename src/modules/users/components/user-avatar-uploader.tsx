'use client';

import { CameraIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/base/components/ui/avatar';
import { LoadingIndicator } from '@/base/components/ui/loading-indicator';
import { Skeleton } from '@/base/components/ui/skeleton';
import { envClient } from '@/base/config/env-client.config';
import { cn } from '@/base/lib';
import { ImagePayload } from '@/modules/media';

import { User } from '../types';

interface UserAvatarUploaderProps {
  user?: Partial<User>;
  className?: string;
  image?: ImagePayload;
  onImageChange?: (image: ImagePayload) => void;
}

export function UserAvatarUploader({
  user,
  className,
  image,
  onImageChange,
}: UserAvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isUploadingFromLocal, setIsUploadingFromLocal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<ImagePayload | undefined>(image);

  const handleFileInputChange = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }

    // TODO: Check file size and dimensions if needed

    setIsUploadingFromLocal(true);
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const previewImageElem = new Image();
      const previewUrl = fileReader.result?.toString() || '';

      previewImageElem.addEventListener('load', (e) => {
        const { src } = e.currentTarget as HTMLImageElement;
        const newUploadedImage: ImagePayload = {
          file,
          previewUrl: src,
        };

        setUploadedImage(newUploadedImage);
        onImageChange?.(newUploadedImage);
      });
      setIsUploadingFromLocal(false);
      previewImageElem.src = previewUrl;
    });
    fileReader.readAsDataURL(file);
  };

  return (
    <div className="relative size-max" onClick={() => inputRef.current?.click()}>
      <Avatar className={cn('border-primary border-2', className)}>
        <AvatarImage
          className="object-cover object-center"
          src={
            uploadedImage?.previewUrl ||
            (user?.avatar
              ? `${envClient.NEXT_PUBLIC_ASSETS_URL}${user.avatar}`
              : '/default-user-avatar.png')
          }
          alt={user?.displayName || ''}
        />
        <AvatarFallback>
          <Skeleton className="size-full" />
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity hover:opacity-100',
          {
            'pointer-events-none opacity-100': isUploadingFromLocal,
          },
        )}
      >
        {!isUploadingFromLocal ? (
          <CameraIcon className="size-8 text-white" />
        ) : (
          <LoadingIndicator className="size-8 text-white" />
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileInputChange(e.target.files?.[0])}
      />
    </div>
  );
}
