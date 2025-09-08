export function keep(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

export function discard(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}