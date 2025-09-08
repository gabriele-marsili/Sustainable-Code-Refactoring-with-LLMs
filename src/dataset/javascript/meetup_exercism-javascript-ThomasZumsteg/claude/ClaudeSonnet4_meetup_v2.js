const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Meetup = function(year, month, day, nth) {
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
      return last(year, month, intDay);
  }
}

function find_day(year, month, day, start, stop) {
  const firstDate = new Date(year, month, start);
  const firstDayOfWeek = firstDate.getDay();
  
  let offset = (day - firstDayOfWeek + 7) % 7;
  const targetDate = start + offset;
  
  if (targetDate <= stop) {
    const result = new Date(year, month, targetDate);
    if (result.getMonth() === month) {
      return result;
    }
  }
  
  throw "Date does not exist";
}

function last(year, month, day) {
  const lastDate = new Date(year, month + 1, 0);
  const lastDayOfWeek = lastDate.getDay();
  
  let offset = (lastDayOfWeek - day + 7) % 7;
  const targetDate = lastDate.getDate() - offset;
  
  return new Date(year, month, targetDate);
}

export default Meetup;