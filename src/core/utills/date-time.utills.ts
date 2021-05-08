export function hoursBetweenDates(start: Date, end: Date): number {
  const strartTime = start.getTime();
  const endTime = end.getTime();
  return Math.abs(endTime - strartTime) / (1e3 * 60 * 60);
}
