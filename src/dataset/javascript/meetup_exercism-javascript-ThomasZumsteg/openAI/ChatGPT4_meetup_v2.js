const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Meetup = function (year, month, day, nth) {
  const intDay = weekDays.indexOf(day);

  switch (nth) {
    case "teenth":
      return findDay(year, month, intDay, 13, 19);
    case "1st":
      return findDay(year, month, intDay, 1, 7);
    case "2nd":
      return findDay(year, month, intDay, 8, 14);
    case "3rd":
      return findDay(year, month, intDay, 15, 21);
    case "4th":
      return findDay(year, month, intDay, 22, 28);
    case "5th":
      return findDay(year, month, intDay, 29, 31);
    case "last":
      return findLast(year, month, intDay);
    default:
      throw new Error("Invalid nth value");
  }
};

function findDay(year, month, day, start, stop) {
  const startDate = new Date(year, month, start);
  const endDate = new Date(year, month, Math.min(stop, daysInMonth(year, month)));

  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    if (date.getDay() === day) return new Date(date);
  }
  throw new Error("Date does not exist");
}

function findLast(year, month, day) {
  const lastDate = new Date(year, month + 1, 0);

  for (let date = lastDate; date.getMonth() === month; date.setDate(date.getDate() - 1)) {
    if (date.getDay() === day) return new Date(date);
  }
  throw new Error("Date does not exist");
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export default Meetup;