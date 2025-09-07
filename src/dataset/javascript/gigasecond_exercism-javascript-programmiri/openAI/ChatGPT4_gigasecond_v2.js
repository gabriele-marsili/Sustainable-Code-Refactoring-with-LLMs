export function gigasecond(birthday) {
  return new Date(birthday.valueOf() + 1e12);
}