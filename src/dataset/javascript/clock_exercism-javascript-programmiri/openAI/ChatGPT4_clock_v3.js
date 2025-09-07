function dateToString(date) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

export function at(hour = 0, minutes = 0) {
  const baseDate = new Date();
  baseDate.setHours(hour, minutes, 0, 0);

  const updateTime = (minOffset) => {
    const newDate = new Date(baseDate.getTime());
    newDate.setMinutes(baseDate.getMinutes() + minOffset);
    return dateToString(newDate);
  };

  return {
    toString: () => dateToString(baseDate),

    plus: (minToAdd) => updateTime(minToAdd),

    minus: (minToSub) => updateTime(-minToSub),

    equals: (clock) => dateToString(baseDate) === clock.toString(),
  };
}