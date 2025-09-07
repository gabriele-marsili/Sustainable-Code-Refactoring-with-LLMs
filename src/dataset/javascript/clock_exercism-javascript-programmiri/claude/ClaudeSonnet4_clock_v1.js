function dateToString(hour, minutes) {
  return String(hour).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
}

export function at(hour = 0, minutes = 0) {
  // Normalize inputs once
  hour = ((hour % 24) + 24) % 24;
  minutes = ((minutes % 60) + 60) % 60;
  
  const timeString = dateToString(hour, minutes);

  return {
    toString: function() {
      return timeString;
    },

    plus: function(minToAdd) {
      const totalMinutes = minutes + minToAdd;
      const newMinutes = ((totalMinutes % 60) + 60) % 60;
      const newHour = ((hour + Math.floor(totalMinutes / 60)) % 24 + 24) % 24;
      return dateToString(newHour, newMinutes);
    },

    minus: function(minToSub) {
      const totalMinutes = minutes - minToSub;
      const newMinutes = ((totalMinutes % 60) + 60) % 60;
      const newHour = ((hour + Math.floor(totalMinutes / 60)) % 24 + 24) % 24;
      return dateToString(newHour, newMinutes);
    },

    equals: function(clock) {
      return timeString === clock.toString();
    },
  };
}