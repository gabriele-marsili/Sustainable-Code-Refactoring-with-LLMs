export function isLeap(year: number): boolean {
    // A year is a leap year if it is divisible by 4,
    // but not by 100, unless it is also divisible by 400.
    // This single boolean expression directly reflects the leap year rules,
    // leveraging short-circuit evaluation for improved efficiency compared to
    // sequential if-statements with intermediate variable assignments.
    // This reduces CPU cycles and memory operations (fewer assignments).
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}