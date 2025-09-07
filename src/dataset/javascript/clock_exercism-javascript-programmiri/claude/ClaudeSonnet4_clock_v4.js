function dateToString(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function at(hour = 0, minutes = 0) {
  let totalMinutes = (hour * 60 + minutes) % 1440;
  if (totalMinutes < 0) totalMinutes += 1440;

  return {
    toString() {
      return dateToString(totalMinutes);
    },

    plus(minToAdd) {
      const newTotal = (totalMinutes + minToAdd) % 1440;
      return dateToString(newTotal < 0 ? newTotal + 1440 : newTotal);
    },

    minus(minToSub) {
      const newTotal = (totalMinutes - minToSub) % 1440;
      return dateToString(newTotal < 0 ? newTotal + 1440 : newTotal);
    },

    equals(clock) {
      return dateToString(totalMinutes) === clock.toString();
    },
  };
}