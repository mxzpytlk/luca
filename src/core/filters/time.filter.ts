export function filterTime(time: number) {
  const hours = Math.trunc(time);
  const minutes = Math.round((time - hours) * 60);
  return (!!hours ? `${hours}h ` : '') + (!!minutes ? `${minutes}m` : '');
}
