import { LocalStorageKey } from '../enums/local-storage-key';

export function setInLocalStorage(key: LocalStorageKey, obj: any) {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function getFromLocalStorage(key: LocalStorageKey): any {
  const res = JSON.parse(localStorage.getItem(key) || '');
  return res;
}
