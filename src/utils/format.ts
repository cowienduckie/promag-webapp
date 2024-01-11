import { default as dayjs } from 'dayjs';

const DEFAULT_DATETIME_FORMAT = 'MMMM D, YYYY h:mm A';

export const formatDate = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  format: string = DEFAULT_DATETIME_FORMAT
) => {
  return dayjs(date).format(format);
};
