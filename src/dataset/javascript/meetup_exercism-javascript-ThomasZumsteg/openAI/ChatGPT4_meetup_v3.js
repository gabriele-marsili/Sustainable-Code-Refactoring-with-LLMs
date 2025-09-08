const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Meetup = function (year, month, day, nth) {
  const intDay = weekDays.indexOf(day);

  switch (nth) {
    case "teenth":
      return find_day(year, month, intDay, 13, 19);
    case "1st":
      return find_day(year, month, intDay, 1, 7);
    case "2nd":
      return find_day(year, month, intDay, 8, 14);
    case "3rd":
      return find_day(year, month, intDay, 15, 21);
    case "4th":
      return find_day(year, month, intDay, 22, 28);
    case "5th":
      return find_day(year, month, intDay, 29, 31);
    case "last":
      return find_last(year, month, intDay);
  }
};

function find_day(year, month, day, start, stop) {
  const startDate = new Date(year, month, start);
  const endDate = new Date(year, month, stop + 1);

  for (let meetup = startDate; meetup < endDate; meetup.setDate(meetup.getDate() + 1)) {
    if (meetup.getDay() === day) return new Date(meetup);
  }
  throw new Error("Date does not exist");
}

function find_last(year, month, day) {
  const lastDate = new Date(year, month + 1, 0);

  for (let meetup = lastDate; meetup.getMonth() === month; meetup.setDate(meetup.getDate() - 1)) {
    if (meetup.getDay() === day) return new Date(meetup);
  }
  throw new Error("Date does not exist");
}

export default Meetup;