function dateToString(date) {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export function at(hour = 0, minutes = 0) {
  const baseDate = new Date();
  baseDate.setHours(hour, minutes, 0, 0);

  const updateTime = (offset) => {
    baseDate.setMinutes(baseDate.getMinutes() + offset);
    return dateToString(baseDate);
  };

  return {
    toString: () => dateToString(baseDate),

    plus: (minToAdd) => updateTime(minToAdd),

    minus: (minToSub) => updateTime(-minToSub),

    equals: (clock) => dateToString(baseDate) === clock.toString(),
  };
}