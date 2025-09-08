export function keep(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    if (fn(val)) {
      result.push(val);
    }
  }
  return result;
}

export function discard(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    if (!fn(val)) {
      result.push(val);
    }
  }
  return result;
}