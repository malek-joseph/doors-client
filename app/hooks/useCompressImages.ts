/** @format */

// hooks/useCompressImages.ts
import imageCompression from "browser-image-compression";
import { useCallback } from "react";

const useCompressImages = () => {
  const compressImages = useCallback(
    async (files: FileList): Promise<File[]> => {
      const compressedFiles: File[] = [];

      // Compression options
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      // Iterate over each file in the FileList
      for (let i = 0; i < files.length; i++) {
        try {
          // Compress each file
          const compressedFile = await imageCompression(files[i], options);
          // Preserve the original file name
          const originalFile = files[i];
          const compressedBlob = compressedFile as Blob;
          const compressedFileWithOriginalName = new File(
            [compressedBlob],
            originalFile.name,
            {
              type: compressedBlob.type,
            }
          );
          compressedFiles.push(compressedFileWithOriginalName);
        } catch (error) {
          console.error("Error compressing image:", error);
        }
      }

      return compressedFiles;
    },
    []
  );

  return compressImages;
};

export default useCompressImages;
