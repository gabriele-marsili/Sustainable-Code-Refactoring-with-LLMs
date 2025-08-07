class Leap {

    /**
     * Determines if a given year is a leap year.
     *
     * A year is a leap year if it is divisible by 400,
     * OR if it is divisible by 4 but not by 100.
     *
     * @param year The year to check.
     * @return true if the year is a leap year, false otherwise.
     */
    boolean isLeapYear(int year) {
        // The original logic is already efficient due to short-circuiting of boolean operators.
        // Applying the standard leap year rule directly.
        // year % 4 == 0 is often micro-optimized by JIT compilers to (year & 3) == 0,
        // as bitwise AND is typically faster than integer division/modulo for powers of 2.
        // Explicitly using bitwise AND here ensures this optimization is applied.
        return (year % 400 == 0) || ((year % 100 != 0) && ((year & 3) == 0));
    }

}