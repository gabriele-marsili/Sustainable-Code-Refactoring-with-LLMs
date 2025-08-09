export const isLeap = (year: number): boolean => {
    // The Gregorian calendar defines a leap year as follows:
    // A year is a leap year if it is exactly divisible by four,
    // except for years that are exactly divisible by 100, but these
    // centurial years are leap years if they are exactly divisible by 400.

    // Using a bitwise AND operation for divisibility by 4 ((year & 3) === 0)
    // is generally slightly more efficient than the modulo operator (year % 4 === 0)
    // for powers of 2, as it avoids a division operation.
    // For positive integers, (year & 3) === 0 is equivalent to year % 4 === 0.
    // The `&&` operator provides short-circuiting: if `year` is not divisible by 4,
    // the rest of the expression is not evaluated, leading to early exit.
    return (year & 3) === 0 && (year % 100 !== 0 || year % 400 === 0);
};