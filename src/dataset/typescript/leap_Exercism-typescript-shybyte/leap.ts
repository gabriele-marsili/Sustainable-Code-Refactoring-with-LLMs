function isLeapYear(year: number) {
    const isDivisibleBy = (x: number) => year % x === 0
    return isDivisibleBy(400) || (isDivisibleBy(4) && !isDivisibleBy(100))
}

export default isLeapYear