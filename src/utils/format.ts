import dayjs from 'dayjs';

//----------------------------------------------------------------------------//
// https://day.js.org/docs/en/display/format

export type DateParamType = dayjs.Dayjs | Date | string | number;

export interface DayjsFormatParam {
  date?: DateParamType | null;
  template?: string;
  defaultValue?: string;
}

export type DayjsFormat = (param: DayjsFormatParam) => string;

//---//

export const STRING_ID_FORMAT = 'YYYYMMDDHHmmss';

export const STRING_MONTH_ID_FORMAT = 'YYYYMM';

export const STRING_DAY_ID_FORMAT = 'YYYYMMDD';

export const STRING_HOUR_ID_FORMAT = 'HHmm';

export const ISO_DATE_FORMAT = 'YYYY-MM-DD';

export const ISO_MONTH_FORMAT = 'YYYY-MM';

export const DATE_FORMAT = 'DD.MM.YYYY';

export const TIME_FORMAT = 'HH:mm';

export const DATE_TIME_FORMAT = `${DATE_FORMAT}, ${TIME_FORMAT}`;

export const MONTH_SHORT_FORMAT = 'MMM';

export const MONTH_FORMAT = 'MM.YYYY';

export const WEEKDAY_SHORT_FORMAT = 'ddd';

export const WEEKDAY_HOUR_FORMAT = 'dd HH:mm';

//---//

/** returns a given date formatted as YYYYMMDDHHmmss */
export const formatDateTimeStringId = (date: DateParamType) =>
  dayjs(date).format(STRING_ID_FORMAT);

/** returns the given dates formatted as YYYYMMDDHHmmss:YYYYMMDDHHmmss:... */
export const formatDatesToStringIds = (...dates: DateParamType[]) =>
  dates.map(formatDateTimeStringId).join(':');

/** returns a given date formatted as YYYYMM */
export const formatMonthStringId = (date: DateParamType) =>
  dayjs(date).format(STRING_MONTH_ID_FORMAT);

/** returns a given date formatted as YYYYMMDD */
export const formatDayStringId = (date: DateParamType) =>
  dayjs(date).format(STRING_DAY_ID_FORMAT);

/** returns a given date formatted as HHmm */
export const formatHourStringId = (date: DateParamType) =>
  dayjs(date).format(STRING_HOUR_ID_FORMAT);

//---//

export const dayjsFormat: DayjsFormat = ({
  date,
  template,
  defaultValue = ''
}) => {
  if (!date) {
    return defaultValue;
  }

  return dayjs(date).format(template);
};

//---//

export const toISODate = (date: DateParamType) =>
  dayjs(date).format(ISO_DATE_FORMAT);

export const toISOMonth = (date: DateParamType) =>
  dayjs(date).format(ISO_MONTH_FORMAT);

export const formatDateTime = (date: DateParamType) =>
  dayjs(date).format(DATE_TIME_FORMAT);

export const formatDate = (date: DateParamType) =>
  dayjs(date).format(DATE_FORMAT);

export const formatMonthShort = (date: DateParamType) =>
  dayjs(date).format(MONTH_SHORT_FORMAT);

export const formatMonth = (date: DateParamType) =>
  dayjs(date).format(MONTH_FORMAT);

export const formatWeekdayShort = (date: DateParamType) =>
  dayjs(date).format(WEEKDAY_SHORT_FORMAT);

export const formatWeekdayHour = (date: DateParamType) =>
  dayjs(date).format(WEEKDAY_HOUR_FORMAT);

//---//

export const formatDateOrEmpty = (date?: DateParamType | null) =>
  dayjsFormat({ date, template: DATE_FORMAT, defaultValue: '' });

export const formatDateOrDash = (date?: DateParamType | null) =>
  dayjsFormat({ date, template: DATE_FORMAT, defaultValue: '-' });

export const formatDateTimeOrDash = (date?: DateParamType | null) =>
  dayjsFormat({ date, template: DATE_TIME_FORMAT, defaultValue: '-' });

//----------------------------------------------------------------------------//

export const DEFAULT_MAXIMUM_FRACTION_DIGITS = 3;

export const formatNumber = (
  value: number,
  maximumFractionDigits = DEFAULT_MAXIMUM_FRACTION_DIGITS,
  locales: Intl.LocalesArgument = navigator?.language
) =>
  new Intl.NumberFormat(locales, {
    maximumFractionDigits
  }).format(value);

//----------------------------------------------------------------------------//
