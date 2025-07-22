class RaindropConverter {
    String convert(int number) {
        // Pre-calculate divisibility to avoid repeated modulo operations.
        final boolean isDivisibleBy3 = (number % 3 == 0);
        final boolean isDivisibleBy5 = (number % 5 == 0);
        final boolean isDivisibleBy7 = (number % 7 == 0);

        // Determine the initial capacity of the StringBuilder more accurately.
        // This avoids reallocations and reduces memory churn.
        int capacity = 0;
        if (isDivisibleBy3) {
            capacity += 5; // "Pling".length()
        }
        if (isDivisibleBy5) {
            capacity += 5; // "Plang".length()
        }
        if (isDivisibleBy7) {
            capacity += 5; // "Plong".length()
        }

        // If no divisibility, directly return the string representation of the number.
        // This avoids StringBuilder allocation and operations entirely in common cases.
        if (capacity == 0) {
            return Integer.toString(number);
        }

        // Initialize StringBuilder with the calculated capacity.
        StringBuilder output = new StringBuilder(capacity);

        // Append strings based on pre-calculated divisibility.
        if (isDivisibleBy3) {
            output.append("Pling");
        }
        if (isDivisibleBy5) {
            output.append("Plang");
        }
        if (isDivisibleBy7) {
            output.append("Plong");
        }

        return output.toString();
    }
}