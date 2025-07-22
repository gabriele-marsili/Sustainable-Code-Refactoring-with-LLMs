class RaindropConverter {
    String convert(int number) {
        // Using a fixed-size array of strings to avoid repeated string concatenations
        // if the conditions are met. This is generally more efficient than
        // StringBuilder for a small, known number of potential appends.
        String[] drops = new String[3];
        int count = 0;

        if (number % 3 == 0) {
            drops[count++] = "Pling";
        }
        if (number % 5 == 0) {
            drops[count++] = "Plang";
        }
        if (number % 7 == 0) {
            drops[count++] = "Plong";
        }

        if (count == 0) {
            return Integer.toString(number);
        } else {
            // Pre-calculate the length to avoid multiple reallocations in StringBuilder
            // if we were to continue using it. However, directly building the string
            // from the array elements is more efficient here.
            int totalLength = 0;
            for (int i = 0; i < count; i++) {
                totalLength += drops[i].length();
            }

            // Using a char array and then converting to String can be more efficient
            // than StringBuilder for known total length and simple concatenations.
            char[] resultChars = new char[totalLength];
            int currentPos = 0;
            for (int i = 0; i < count; i++) {
                String drop = drops[i];
                for (int j = 0; j < drop.length(); j++) {
                    resultChars[currentPos++] = drop.charAt(j);
                }
            }
            return new String(resultChars);
        }
    }
}