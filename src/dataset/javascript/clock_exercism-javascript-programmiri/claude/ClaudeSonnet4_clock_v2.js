function dateToString(hour, minutes) {
  return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function at(hour = 0, minutes = 0) {
  let currentHour = hour % 24;
  let currentMinutes = minutes % 60;
  
  if (currentHour < 0) currentHour += 24;
  if (currentMinutes < 0) currentMinutes += 60;

  return {
    toString: function() {
      return dateToString(currentHour, currentMinutes);
    },

    plus: function(minToAdd) {
      let totalMinutes = currentMinutes + minToAdd;
      let hoursToAdd = Math.floor(totalMinutes / 60);
      currentMinutes = totalMinutes % 60;
      currentHour = (currentHour + hoursToAdd) % 24;
      
      if (currentMinutes < 0) {
        currentMinutes += 60;
        currentHour--;
      }
      if (currentHour < 0) currentHour += 24;
      
      return dateToString(currentHour, currentMinutes);
    },

    minus: function(minToSub) {
      let totalMinutes = currentMinutes - minToSub;
      let hoursToSub = Math.ceil(-totalMinutes / 60);
      currentMinutes = totalMinutes % 60;
      currentHour = (currentHour - hoursToSub) % 24;
      
      if (currentMinutes < 0) {
        currentMinutes += 60;
        currentHour--;
      }
      if (currentHour < 0) currentHour += 24;
      
      return dateToString(currentHour, currentMinutes);
    },

    equals: function(clock) {
      return dateToString(currentHour, currentMinutes) === clock.toString();
    },
  };
}