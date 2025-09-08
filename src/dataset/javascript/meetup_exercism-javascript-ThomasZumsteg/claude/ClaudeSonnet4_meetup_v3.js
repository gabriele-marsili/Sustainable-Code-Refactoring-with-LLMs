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
  if (range) {
    return find_day(year, month, intDay, range[0], range[1]);
  }
  
  throw "Invalid nth parameter";
};

function find_day(year, month, day, start, stop) {
  const startDate = new Date(year, month, start);
  const dayOffset = (day - startDate.getDay() + 7) % 7;
  const targetDate = start + dayOffset;
  
  if (targetDate <= stop) {
    const result = new Date(year, month, targetDate);
    if (result.getMonth() === month) {
      return result;
    }
  }
  
  throw "Date does not exist";
}

function last(year, month, day) {
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const lastDay = lastDayOfMonth.getDate();
  const lastDayWeekday = lastDayOfMonth.getDay();
  
  const daysBack = (lastDayWeekday - day + 7) % 7;
  const targetDate = lastDay - daysBack;
  
  return new Date(year, month, targetDate);
}

Date.prototype.addDays = function(days) {
  const dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

export default Meetup;