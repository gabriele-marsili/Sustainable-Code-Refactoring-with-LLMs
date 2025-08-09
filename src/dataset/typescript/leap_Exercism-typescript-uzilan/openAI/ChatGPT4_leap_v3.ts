function isLeapYear(year: number): boolean {
    const divisibleBy4 = (year & 3) === 0;
    return divisibleBy4 && (year % 25 !== 0 || year % 16 === 0);
}

export default isLeapYear;