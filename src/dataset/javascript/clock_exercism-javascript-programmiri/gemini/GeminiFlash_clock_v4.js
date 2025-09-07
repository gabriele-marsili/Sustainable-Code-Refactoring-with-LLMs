function dateToString(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function at(hour = 0, minutes = 0) {
  let currentMinutes = hour * 60 + minutes;

  return {
    toString: function() {
      const hours = Math.floor(currentMinutes / 60) % 24;
      const mins = currentMinutes % 60;
      return String(hours).padStart(2, '0') + ':' + String(mins).padStart(2, '0');
    },

    plus: function(minToAdd) {
      currentMinutes = (currentMinutes + minToAdd) % (24 * 60);
      if (currentMinutes < 0) {
        currentMinutes += (24 * 60);
      }
      const hours = Math.floor(currentMinutes / 60) % 24;
      const mins = currentMinutes % 60;
      return String(hours).padStart(2, '0') + ':' + String(mins).padStart(2, '0');
    },

    minus: function(minToSub) {
      currentMinutes = (currentMinutes - minToSub) % (24 * 60);
      if (currentMinutes < 0) {
        currentMinutes += (24 * 60);
      }
      const hours = Math.floor(currentMinutes / 60) % 24;
      const mins = currentMinutes % 60;
      return String(hours).padStart(2, '0') + ':' + String(mins).padStart(2, '0');
    },

    equals: function(clock) {
      const hours = Math.floor(currentMinutes / 60) % 24;
      const mins = currentMinutes % 60;
      return String(hours).padStart(2, '0') + ':' + String(mins).padStart(2, '0') == clock.toString();
    },
  };
}