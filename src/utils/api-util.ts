export const getTotalPages = (totalResults: number, pageSize: number) => {
  return Math.ceil(totalResults / pageSize);
};
