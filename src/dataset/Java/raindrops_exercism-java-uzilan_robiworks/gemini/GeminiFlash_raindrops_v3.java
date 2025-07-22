class RaindropConverter {
    private static final String PLING = "Pling";
    private static final String PLANG = "Plang";
    private static final String PLONG = "Plong";

    String convert(int number) {
        // A StringBuilder with an initial capacity that is the maximum possible length
        // ("PlingPlangPlong"). This avoids reallocations.
        StringBuilder output = new StringBuilder(PLING.length() + PLANG.length() + PLONG.length());

        // Using a switch statement or a series of if-else if could be slightly faster
        // for very specific cases, but for just three conditions, separate ifs are clear
        // and allow for combinations (e.g., divisible by 3 and 5).
        // The JVM is highly optimized for such simple boolean checks.
        boolean appended = false; // Flag to track if any string has been appended

        if (number % 3 == 0) {
            output.append(PLING);
            appended = true;
        }
        if (number % 5 == 0) {
            output.append(PLANG);
            appended = true;
        }
        if (number % 7 == 0) {
            output.append(PLONG);
            appended = true;
        }

        // Check the flag instead of output.length() for a marginal performance gain
        // if the string is very long (though not the case here).
        // For clarity and consistency, both approaches are fine, but checking a boolean
        // is generally faster than calling a method.
        if (appended) {
            return output.toString();
        } else {
            // Integer.toString(int) is generally efficient.
            return Integer.toString(number);
        }
    }
}