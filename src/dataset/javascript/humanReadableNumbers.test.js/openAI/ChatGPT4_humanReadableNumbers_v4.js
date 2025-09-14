function humanReadable(seconds) {
  const hours = (seconds / 3600) | 0;
  const minutes = ((seconds % 3600) / 60) | 0;
  seconds = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default humanReadable;