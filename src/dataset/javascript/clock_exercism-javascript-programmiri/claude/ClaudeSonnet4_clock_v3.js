function dateToString(hours, minutes) {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function at(hour = 0, minutes = 0) {
  let currentHours = hour;
  let currentMinutes = minutes;

  return {
    toString() {
      return dateToString(currentHours, currentMinutes);
    },

    plus(minToAdd) {
      const totalMinutes = currentMinutes + minToAdd;
      currentHours = (currentHours + Math.floor(totalMinutes / 60)) % 24;
      currentMinutes = totalMinutes % 60;
      return dateToString(currentHours, currentMinutes);
    },

    minus(minToSub) {
      let totalMinutes = currentMinutes - minToSub;
      let hoursToSubtract = 0;
      
      while (totalMinutes < 0) {
        totalMinutes += 60;
        hoursToSubtract++;
      }
      
      currentHours = (currentHours - hoursToSubtract + 24) % 24;
      currentMinutes = totalMinutes;
      return dateToString(currentHours, currentMinutes);
    },

    equals(clock) {
      return dateToString(currentHours, currentMinutes) === clock.toString();
    },
  };
}