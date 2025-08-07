#include "leap.h"

bool leap::is_leap_year(int year)
{
    // The Gregorian calendar leap year rule states:
    // A year is a leap year if it is divisible by 4,
    // UNLESS it is divisible by 100 BUT NOT by 400.

    // This single boolean expression encapsulates the entire rule.
    // It is logically equivalent to the original sequence of if-statements,
    // but expressed concisely in a single return statement.
    //
    // The original code uses an implicit if-else if-else structure with early returns,
    // which is also highly efficient. Modern compilers are excellent at optimizing
    // both explicit if-else chains and complex boolean expressions.
    //
    // This version aims to be clear, maintainable, and relies on the compiler's
    // ability to optimize the underlying logical and arithmetic operations
    // for minimal CPU cycles and thus reduced energy consumption.
    // The sequence of checks (short-circuiting logic applies):
    // 1. (year % 4 == 0): Checks divisibility by 4. If false, the entire expression is false.
    // 2. (year % 100 != 0): If divisible by 4, checks if not divisible by 100. If true, the inner OR
    //    short-circuits to true, making the entire expression true.
    // 3. (year % 400 == 0): If divisible by 4 AND divisible by 100, checks if divisible by 400.
    //    The result of this is the final value.
    // This maintains the functionality for all integer values of 'year',
    // including negative numbers, as the behavior of the modulo operator (%)
    // for signed integers is consistent across C++ versions (C++11 onwards).
    return (year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0));
}