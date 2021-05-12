export interface IPoint {
  x: number;
  y: number;
}

export function distanceBetweenPoints(first: IPoint, second: IPoint) {
  return Math.sqrt((first.x - second.x) ** 2 + (first.y - second.y) ** 2);
}

export function xAxisAngle(first: IPoint, second: IPoint) {
  const a = first.y - second.y;
  const c = distanceBetweenPoints(first, second);
  return Math.asin(a / c);
}
