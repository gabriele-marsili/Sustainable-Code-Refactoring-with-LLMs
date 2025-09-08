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
  }
}

function find_day(year, month, day, start, stop) {
  var date = new Date(year, month, start);
  var targetDay = day;
  var currentDay = date.getDay();
  
  var daysToAdd = (targetDay - currentDay + 7) % 7;
  date.setDate(start + daysToAdd);
  
  if (date.getDate() <= stop && date.getMonth() === month) {
    return date;
  }
  
  throw "Date does not exist";
}

function last(year, month, day) {
  var date = new Date(year, month + 1, 0);
  var targetDay = day;
  var currentDay = date.getDay();
  
  var daysToSubtract = (currentDay - targetDay + 7) % 7;
  date.setDate(date.getDate() - daysToSubtract);
  
  if (date.getMonth() === month) {
    return date;
  }
  
  throw "Date does not exist";
}

Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

export default Meetup;