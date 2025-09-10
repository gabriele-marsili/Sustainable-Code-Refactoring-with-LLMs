function accumulate(items, func) {
  /* Applies a function to every item in a list */
  const modified = Array(items.length);
  for (let i = 0; i < items.length; i++) {
    modified[i] = func(items[i]);
  }
  return modified;
}

export default accumulate;