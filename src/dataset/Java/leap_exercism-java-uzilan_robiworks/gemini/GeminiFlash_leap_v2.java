class Leap {

    boolean isLeapYear(int year) {
        // Optimized boolean expression for the Gregorian calendar leap year rule.
        // A year is a leap year if it is divisible by 4,
        // unless it is divisible by 100 but not by 400.
        //
        // The expression is arranged to potentially improve average-case performance
        // through short-circuiting.
        // - Most years are not divisible by 4. If 'year % 4 != 0', the expression
        //   short-circuits immediately after the first modulo operation, returning false.
        //   This covers 75% of cases quickly.
        // - If 'year % 4 == 0', it then checks 'year % 100 != 0'.
        //   - If true (e.g., 2004), the '||' condition is met, and the overall '&&'
        //     is true, returning true.
        //   - If false (e.g., 1900, 2000), it proceeds to check 'year % 400 == 0'.
        //     - If true (e.g., 2000), the '||' condition is met, and the overall '&&' is true.
        //     - If false (e.g., 1900), the '||' condition is false, and the overall '&&' is false.
        // This ordering prioritizes the most common and cheapest checks first.
        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
    }

}