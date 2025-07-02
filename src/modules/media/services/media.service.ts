import { HttpClient } from '@/base/lib';

import { MediaUploadResponse } from '../types';

class MediaService extends HttpClient {
  constructor() {
    super();
  }

  async uploadFiles({ files, folder }: { files: File[]; folder?: string }) {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    return this.post<MediaUploadResponse>('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        folder,
      },
      isPrivateRoute: true,
    });
  }

  async uploadFromUrl({ url, folder }: { url: string; folder?: string }) {
    return this.post<Pick<MediaUploadResponse, 'data'>>(
      '/media/upload/url',
      {
        url,
        folder,
      },
      {
        isPrivateRoute: true,
      },
    );
  }

  async deleteFile({ name }: { name: string }) {
    return this.delete(`/media/delete`, {
      data: { fileName: name },
      isPrivateRoute: true,
    });
  }
}

export const mediaService = new MediaService();
