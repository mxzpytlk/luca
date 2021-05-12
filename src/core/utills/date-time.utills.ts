export function hoursBetweenDates(start: Date, end: Date): number {
  const strartTime = start.getTime();
  const endTime = end.getTime();
  return Math.abs(endTime - strartTime) / (1e3 * 60 * 60);
}

export function hoursToMilisecrond(h: number) {
  return h * 60 * 60 * 1e3;
}

export function dateFromStringWithoutTimeZone(str: string): Date {
  if (str?.slice(-1).toLowerCase() === 'z') {
    return new Date(str.slice(0, -1));
  }
  return new Date(str);
}
