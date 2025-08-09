#include "leap.h"

bool leap_year(int year) {
    // A year is a leap year if it is divisible by 4,
    // unless it is divisible by 100 but not by 400.

    // The original expression logic:
    // (year % 100 == 0 && year % 400 == 0)  // Case: Divisible by 400 (e.g., 2000)
    // ||
    // (year % 100 != 0 && year % 4 == 0)    // Case: Divisible by 4 but not by 100 (e.g., 2004)

    // This logic is correct and effectively utilizes short-circuiting to minimize operations.
    // In all scenarios (year % 100 == 0 or year % 100 != 0), it performs exactly two modulo operations.

    // Optimization: Replace 'year % 4 == 0' with '(year & 3) == 0'.
    // For powers of two, the modulo operation (e.g., % 4) can often be replaced by a bitwise AND operation (e.g., & 3).
    // Bitwise operations are typically faster than general integer modulo operations.
    // While modern compilers often optimize 'year % 4' to '(year & 3)' automatically,
    // explicitly writing it ensures this optimization and can make the code's intent clearer
    // for divisibility by powers of two.

    // This change potentially reduces execution time for the common case where 'year % 100 != 0'.
    // For cases where 'year % 100 == 0', the first part of the OR condition is evaluated,
    // and the '% 4' operation is not reached, so performance remains identical.
    // Overall, this minor change aims to reduce CPU cycles, directly contributing to lower energy consumption.
    return (year % 100 == 0 && year % 400 == 0) ||
           (year % 100 != 0 && (year & 3) == 0);
}