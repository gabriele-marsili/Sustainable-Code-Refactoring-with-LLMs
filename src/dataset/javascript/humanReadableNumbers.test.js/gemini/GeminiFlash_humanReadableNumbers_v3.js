function humanReadable (seconds) {
  const hh = Math.floor(seconds / 3600);
  const mm = Math.floor((seconds % 3600) / 60);
  const ss = seconds % 60;

  return (
    String(hh).padStart(2, '0') +
    ':' +
    String(mm).padStart(2, '0') +
    ':' +
    String(ss).padStart(2, '0')
  );
}

export default humanReadable;