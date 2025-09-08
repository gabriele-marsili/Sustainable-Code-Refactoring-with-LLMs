var weekDays = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");

var Meetup = function(year, month, day, nth) {
  var intDay = weekDays.indexOf(day);

  let startDate, endDate;

  switch (nth) {
    case "teenth":
      startDate = 13;
      endDate = 19;
      break;
    case "1st":
      startDate = 1;
      endDate = 7;
      break;
    case "2nd":
      startDate = 8;
      endDate = 14;
      break;
    case "3rd":
      startDate = 15;
      endDate = 21;
      break;
    case "4th":
      startDate = 22;
      endDate = 28;
      break;
    case "5th":
      startDate = 29;
      endDate = 31;
      break;
    case "last":
      return last(year, month, intDay);
    default:
      throw new Error("Invalid nth value");
  }

  return find_day(year, month, intDay, startDate, endDate);
};

function find_day(year, month, day, start, stop) {
  for (let date = start; date <= stop; date++) {
    const meetup = new Date(year, month, date);
    if (meetup.getMonth() === month && meetup.getDay() === day) {
      return meetup;
    }
  }
  throw new Error("Date does not exist");
}

function last(year, month, day) {
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  for (let date = lastDayOfMonth; date >= 1; date--) {
    const meetup = new Date(year, month, date);
    if (meetup.getMonth() === month && meetup.getDay() === day) {
      return meetup;
    }
  }
  throw new Error("Date does not exist");
}

export default Meetup;