function accumulate(items, func) {
  /* Applies a function to every item in a list */
  return items.map(func);
}

export default accumulate;