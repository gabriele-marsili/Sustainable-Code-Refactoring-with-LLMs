function dateToString(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function at(hour = 0, minutes = 0) {
  let internalMinutes = hour * 60 + minutes;

  return {
    toString: function() {
      const hours = String(Math.floor(internalMinutes / 60)).padStart(2, '0');
      const minutes = String(internalMinutes % 60).padStart(2, '0');
      return `${hours}:${minutes}`;
    },

    plus: function(minToAdd) {
      internalMinutes = (internalMinutes + minToAdd) % 1440;
      if (internalMinutes < 0) {
        internalMinutes += 1440;
      }
      const hours = String(Math.floor(internalMinutes / 60)).padStart(2, '0');
      const minutes = String(internalMinutes % 60).padStart(2, '0');
      return `${hours}:${minutes}`;
    },

    minus: function(minToSub) {
      internalMinutes = (internalMinutes - minToSub) % 1440;
      if (internalMinutes < 0) {
        internalMinutes += 1440;
      }
      const hours = String(Math.floor(internalMinutes / 60)).padStart(2, '0');
      const minutes = String(internalMinutes % 60).padStart(2, '0');
      return `${hours}:${minutes}`;
    },

    equals: function(clock) {
      return this.toString() == clock.toString();
    },
  };
}