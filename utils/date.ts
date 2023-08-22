import { format } from "date-fns-tz";

const formatDate = (date: Date | string, formatter?: string): string => {
  const parsedDate = new Date(date);
  return format(parsedDate, formatter || "yyyy-MM-dd HH:mm:ss");
};

export { formatDate };
