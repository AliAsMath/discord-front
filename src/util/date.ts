export const convertDateToHumanReadable = (
  stringDate: string,
  format: string
) => {
  const date = new Date(stringDate);
  return (
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  );
};
