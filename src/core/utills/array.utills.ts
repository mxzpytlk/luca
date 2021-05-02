export function flatArr<T>(arr: T[][]): T[] {
  const newArr: T[] = [];
  return newArr.concat(...arr);
}
