export function gigasecond(birthday) {
  const gigasecondInMilliseconds = 1000000000000;
  return new Date(birthday.getTime() + gigasecondInMilliseconds);
}