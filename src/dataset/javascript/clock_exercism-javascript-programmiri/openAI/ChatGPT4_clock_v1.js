function formatTime(hours, minutes) {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function at(hour = 0, minutes = 0) {
  let totalMinutes = hour * 60 + minutes;

  return {
    toString: function() {
      const hours = Math.floor(totalMinutes / 60) % 24;
      const mins = totalMinutes % 60;
      return formatTime(hours, mins);
    },

    plus: function(minToAdd) {
      totalMinutes += minToAdd;
      return this.toString();
    },

    minus: function(minToSub) {
      totalMinutes -= minToSub;
      return this.toString();
    },

    equals: function(clock) {
      return this.toString() === clock.toString();
    },
  };
}