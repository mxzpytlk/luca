function dec2hex(dec: number) {
  return ('0' + dec.toString(16)).substr(-2);
}

export function generateId(len?: number) {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}
