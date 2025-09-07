export function gigasecond(birthday) {
  const gigasecondInMilliseconds = 1e12;
  return new Date(birthday.getTime() + gigasecondInMilliseconds);
}