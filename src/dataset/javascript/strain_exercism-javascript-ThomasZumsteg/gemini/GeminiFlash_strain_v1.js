export default {
  keep: keep,
  discard: discard,
};

function keep(items, func) {
  /* Selects items for which a function is True */
  const kept = [];
  for (const item of items) {
    if (func(item)) {
      kept.push(item);
    }
  }
  return kept;
}

function discard(items, func) {
  /* Selects items for which a function is False */
  const discarded = [];
  for (const item of items) {
    if (!func(item)) {
      discarded.push(item);
    }
  }
  return discarded;
}