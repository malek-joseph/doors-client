// /** @format */

// // hooks/useArrayToFileList.ts
// import { useMemo } from "react";

// const useArrayToFileList = (files: (File | Blob)[]): FileList => {
//   const fileList = useMemo(() => {
//     const dt = new DataTransfer();

//     files.forEach((file) => {
//       if (file instanceof Blob) {
//         const blob = file as Blob;
//         const convertedFile = new File([blob], "compressed-image.jpg", {
//           type: blob.type,
//         });
//         dt.items.add(convertedFile);
//       } else if (file instanceof File) {
//         dt.items.add(file);
//       } else {
//         throw new Error("Invalid file type");
//       }
//     });

//     return dt.files;
//   }, [files]);

//   return fileList;
// };

// export default useArrayToFileList;
