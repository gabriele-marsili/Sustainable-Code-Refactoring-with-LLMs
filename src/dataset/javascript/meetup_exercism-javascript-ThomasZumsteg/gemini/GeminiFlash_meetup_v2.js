const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Meetup = function(year, month, day, nth) {
  const intDay = weekDays.indexOf(day);

  if (intDay === -1) {
      throw new Error("Invalid day of the week");
  }

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
      return findLastDay(year, month, intDay);
    default:
      throw new Error("Invalid nth value");
  }

  return findDay(year, month, intDay, startDate, endDate);
};

function findDay(year, month, day, start, end) {
    for (let date = start; date <= end; date++) {
        const meetup = new Date(year, month, date);
        if (meetup.getDay() === day && meetup.getMonth() === month) {
            return meetup;
        }
    }
    throw new Error("Date does not exist");
}


function findLastDay(year, month, day) {
    let lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    for (let date = lastDayOfMonth; date >= 1; date--) {
        const meetup = new Date(year, month, date);
        if (meetup.getDay() === day && meetup.getMonth() === month) {
            return meetup;
        }
    }
    throw new Error("Date does not exist");
}

export default Meetup;