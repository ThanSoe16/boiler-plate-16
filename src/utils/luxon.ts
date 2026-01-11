import { DateTime as LuxonDateTime } from 'luxon';
const TIME_ZONE = 'Asia/Singapore';

export const DateTime = {
  ...LuxonDateTime,

  fromJSDate(date: Date) {
    return LuxonDateTime.fromJSDate(date, { zone: TIME_ZONE });
  },

  fromISO(iso: string) {
    return LuxonDateTime.fromISO(iso, { zone: TIME_ZONE });
  },

  now() {
    return LuxonDateTime.now().setZone(TIME_ZONE);
  },
};
