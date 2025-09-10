function accumulate(items, func) {
  const modified = Array(items.length);
  for (let i = 0; i < items.length; i++) {
    modified[i] = func(items[i]);
  }
  return modified;
}

export default accumulate;