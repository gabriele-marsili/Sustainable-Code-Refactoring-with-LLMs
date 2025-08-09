function isLeapYear(year: number): boolean {
    const mod4 = year & 3;
    if (mod4 !== 0) return false;
    if (year % 25 !== 0) return true;
    return year % 16 === 0;
}

export default isLeapYear