export function keep(arr, fn) {
  const result = [];
  for (const val of arr) {
    if (fn(val)) result.push(val);
  }
  return result;
}

export function discard(arr, fn) {
  const result = [];
  for (const val of arr) {
    if (!fn(val)) result.push(val);
  }
  return result;
}