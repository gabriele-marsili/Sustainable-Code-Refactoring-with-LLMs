function humanReadable (seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const hh = hours < 10 ? "0" + hours : hours;
  const mm = minutes < 10 ? "0" + minutes : minutes;
  const ss = secs < 10 ? "0" + secs : secs;

  return `${hh}:${mm}:${ss}`;
}

export default humanReadable;