function formatTime(hour, minute) {
  const h = String(hour).padStart(2, '0');
  const m = String(minute).padStart(2, '0');
  return `${h}:${m}`;
}

export function at(hour = 0, minute = 0) {
  let currentHour = hour;
  let currentMinute = minute;

  const normalizeTime = () => {
    while (currentMinute >= 60) {
      currentHour++;
      currentMinute -= 60;
    }
    while (currentMinute < 0) {
      currentHour--;
      currentMinute += 60;
    }
    while (currentHour >= 24) {
      currentHour -= 24;
    }
    while (currentHour < 0) {
      currentHour += 24;
    }
  };

  normalizeTime();

  const clock = {
    toString: () => {
      return formatTime(currentHour, currentMinute);
    },

    plus: (minutesToAdd) => {
      currentMinute += minutesToAdd;
      normalizeTime();
      return clock.toString();
    },

    minus: (minutesToSubtract) => {
      currentMinute -= minutesToSubtract;
      normalizeTime();
      return clock.toString();
    },

    equals: (otherClock) => {
      return clock.toString() === otherClock.toString();
    },
  };

  return clock;
}