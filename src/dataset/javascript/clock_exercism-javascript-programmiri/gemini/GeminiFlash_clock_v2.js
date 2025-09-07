function formatTime(hour, minute) {
  const h = String(hour).padStart(2, '0');
  const m = String(minute).padStart(2, '0');
  return `${h}:${m}`;
}

export function at(hour = 0, minute = 0) {
  let currentHour = hour;
  let currentMinute = minute;

  const normalizeTime = () => {
    currentMinute = currentMinute % 60;
    if (currentMinute < 0) {
      currentHour += Math.floor(currentMinute / 60);
      currentMinute = 60 + currentMinute % 60;
    }
    currentHour += Math.floor(currentMinute / 60);
    currentMinute = currentMinute % 60;

    currentHour = currentHour % 24;
    if (currentHour < 0) {
      currentHour = 24 + currentHour % 24;
    }
    currentHour = currentHour % 24;
  };

  normalizeTime();

  const toString = () => {
    return formatTime(currentHour, currentMinute);
  };

  return {
    toString,

    plus: (minToAdd) => {
      currentMinute += minToAdd;
      normalizeTime();
      return toString();
    },

    minus: (minToSub) => {
      currentMinute -= minToSub;
      normalizeTime();
      return toString();
    },

    equals: (clock) => {
      return toString() === clock.toString();
    },
  };
}