function isLeapYear(year: number): boolean {
    // According to the Gregorian calendar, a year is a leap year if it satisfies one of the following conditions:
    // 1. It is divisible by 400 (e.g., 2000, 2400).
    // OR
    // 2. It is divisible by 4 but NOT by 100 (e.g., 2004, 2008, but not 1900, 2100).

    // The original logic was: (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)

    // This optimized version reorders the checks to minimize operations for the most common cases.
    // Most years are not divisible by 4, so checking `year % 4` first allows for
    // early exit (short-circuiting) for 75% of inputs with a single modulo operation.
    //
    // The equivalent logical expression for the definition above, reordered for efficiency, is:
    // (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))

    // Breakdown of the optimized logic:
    // - `year % 4 === 0`: Check if the year is divisible by 4. If false, it's definitively not a leap year.
    //   This is the quickest check and rules out most years.
    // - `year % 100 !== 0`: If divisible by 4, check if it's NOT divisible by 100. If true, it's a leap year
    //   (e.g., 2004, 2008). The `||` operator will short-circuit, avoiding the last check.
    // - `year % 400 === 0`: If divisible by 4 AND by 100 (i.e., a century year like 1900, 2000),
    //   it must also be divisible by 400 to be a leap year (e.g., 2000 is, 1900 is not).

    return (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0));
}

export default isLeapYear;