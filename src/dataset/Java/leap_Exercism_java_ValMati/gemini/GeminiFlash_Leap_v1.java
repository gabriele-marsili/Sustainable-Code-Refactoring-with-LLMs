class Leap {

    boolean isLeapYear(int year) {
        // Optimized: 'year % 4 == 0' is replaced with '(year & 3) == 0'.
        // Checking divisibility by a power of 2 (like 4 = 2^2) using a bitwise AND
        // operation (year & (2^n - 1)) is significantly faster than a modulo operation,
        // as it avoids a division instruction and can be a single CPU cycle.
        return (year & 3) == 0 && (year % 100 != 0 || year % 400 == 0);
    }

}