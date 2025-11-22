import { format, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDateUtil = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  if (isSameDay(date, now)) return format(date, 'a h:mm', { locale: ko });
  else return format(date, 'yyyy.MM.dd', { locale: ko });
};
