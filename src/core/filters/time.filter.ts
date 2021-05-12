import { localeFilter } from './locale.filter';

export function filterTime(time: number) {
  const h = localeFilter('h');
  const m = localeFilter('m');
  if (time <= 0) {
    return `0${h}`;
  }

  const hours = Math.trunc(time);
  const minutes = Math.round((time - hours) * 60);
  return (!!hours ? `${hours}${h} ` : '') + (!!minutes ? `${minutes}${m}` : '');
}
