var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var Meetup = function(year, month, day, nth) {
  var intDay = weekDays.indexOf(day);

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
      return last(year, month, intDay);
    default:
      throw new Error("Invalid nth value");
  }
};

function find_day(year, month, day, start, stop) {
  for (let date = start; date <= stop; date++) {
    const meetup = new Date(year, month, date);
    if (meetup.getDay() === day && meetup.getMonth() === month) {
      return meetup;
    }
  }
  throw new Error("Date does not exist");
}

function last(year, month, day) {
  for (let date = new Date(year, month + 1, 0).getDate(); date >= 1; date--) {
    const meetup = new Date(year, month, date);
    if (meetup.getDay() === day && meetup.getMonth() === month) {
      return meetup;
    }
  }
  throw new Error("Date does not exist");
}

export default Meetup;