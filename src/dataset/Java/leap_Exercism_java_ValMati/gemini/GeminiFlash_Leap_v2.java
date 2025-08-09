class Leap {

    boolean isLeapYear(int year) {
        // Optimized check for divisibility by 4 using bitwise AND.
        // (year & 3) == 0 is equivalent to year % 4 == 0 for all integer values in Java,
        // and is often slightly more efficient as it avoids a division operation.
        // The short-circuiting logical operators (&&, ||) are already used effectively
        // to minimize computations: the most common check (divisibility by 4) is performed first,
        // quickly eliminating about 75% of years.
        return (year & 3) == 0 && (year % 100 != 0 || year % 400 == 0);
    }

}