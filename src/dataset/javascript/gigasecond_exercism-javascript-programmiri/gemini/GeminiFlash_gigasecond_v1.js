export function gigasecond(birthday) {
  const gigasecondInMs = 1000000000000;
  return new Date(birthday.getTime() + gigasecondInMs);
}