function isLeapYear(year: number): boolean {
    // A year is a leap year if it is divisible by 400,
    // OR if it is divisible by 4 AND not divisible by 100.
    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

export default isLeapYear;