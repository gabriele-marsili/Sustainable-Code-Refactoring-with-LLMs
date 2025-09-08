const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const nthRanges = {
  "teenth": [13, 19],
  "1st": [1, 7],
  "2nd": [8, 14],
  "3rd": [15, 21],
  "4th": [22, 28],
  "5th": [29, 31]
};

var Meetup = function(year, month, day, nth) {
  const intDay = weekDays.indexOf(day);
  
  if (nth === "last") {
    return last(year, month, intDay);
  }
  
  const range = nthRanges[nth];
  return find_day(year, month, intDay, range[0], range[1]);
};

function find_day(year, month, day, start, stop) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const actualStop = Math.min(stop, daysInMonth);
  
  for (let date = start; date <= actualStop; date++) {
    const meetup = new Date(year, month, date);
    if (meetup.getDay() === day) {
      return meetup;
    }
  }
  throw "Date does not exist";
}

function last(year, month, day) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let date = daysInMonth; date >= 1; date--) {
    const meetup = new Date(year, month, date);
    if (meetup.getDay() === day) {
      return meetup;
    }
  }
  throw "Date does not exist";
}

Date.prototype.addDays = function(days) {
  const dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

export default Meetup;