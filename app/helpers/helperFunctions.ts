/** @format */

export const capitalizeFirstLetter = (str: string | null): string => {
  if (!str) return ""; 
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const removeSlashes = (path: string) => {
  return path.replace(/^\/|\/$/g, '');
};
