// hooks/useFileListToArray.ts
const useFileListToArray = (fileList: FileList | null): File[] => {
  if (!fileList) return [];

  const array: File[] = [];
  for (let i = 0; i < fileList.length; i++) {
    array.push(fileList[i]);
  }
  return array;
};

export default useFileListToArray;
