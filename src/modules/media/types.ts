export type ImagePayload = {
  file: File;
  previewUrl: string;
};

export type VideoPayload = {
  file: File;
  previewUrl: string;
  thumbnailUrl: string;
};

export type MediaUploadResponse = {
  data: [
    {
      url: string;
      fileName: string;
    },
  ];
  metadata: {
    successCount: number;
    failedCount: number;
  };
};
