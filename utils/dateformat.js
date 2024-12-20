import dayjs from 'dayjs'
import 'dayjs/locale/id'

export function customFormatDate(apiDate, locale, format) {
  const date = dayjs(apiDate).locale(locale);
  const day = date.format('DD');
  const year = date.format('YYYY');
  const fullMonthName = date.format('MMMM');
  const hour = date.format('HH');
  const minute = date.format('mm')

  const monthMappings = {
    id: {
      Agustus: 'Agu',
      Desember: 'Des',
    },
    en: {
      December: 'Dec',
    },
  };

  let shortMonth = fullMonthName.slice(0, 3);
  if (monthMappings[locale] && monthMappings[locale][fullMonthName]) {
    shortMonth = monthMappings[locale][fullMonthName];
  }

  const formattedDate = format
    .replace('{DD}', day)
    .replace('{MMM}', shortMonth)
    .replace('{MMMM}', fullMonthName)
    .replace('{YYYY}', year)
    .replace('{HH}', hour)
    .replace('{mm}', minute);

  return formattedDate;
}