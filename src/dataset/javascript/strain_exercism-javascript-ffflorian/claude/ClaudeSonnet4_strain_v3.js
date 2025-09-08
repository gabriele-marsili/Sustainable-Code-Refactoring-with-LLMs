export function keep(arr, fn) {
  const result = new Array(arr.length);
  let writeIndex = 0;
  
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      result[writeIndex++] = arr[i];
    }
  }
  
  result.length = writeIndex;
  return result;
}

export function discard(arr, fn) {
  const result = new Array(arr.length);
  let writeIndex = 0;
  
  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i])) {
      result[writeIndex++] = arr[i];
    }
  }
  
  result.length = writeIndex;
  return result;
}