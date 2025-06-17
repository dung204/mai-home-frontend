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
      timeout: 60000,
    });
  }
}

export const mediaService = new MediaService();
