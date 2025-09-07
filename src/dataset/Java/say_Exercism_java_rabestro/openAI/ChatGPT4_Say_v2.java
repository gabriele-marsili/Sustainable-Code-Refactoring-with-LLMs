public final class Say {
    public static final long MAXIMUM_PRONOUNCEABLE_NUMBER = 999_999_999_999L;
    private static final String[] BELOW_TWENTY = {
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", 
        "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", 
        "seventeen", "eighteen", "nineteen"
    };
    private static final String[] TENS = {
        "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
    };
    private static final String[] MAGNITUDES = {"", "thousand", "million", "billion"};

    public String say(long number) {
        if (number < 0 || number > MAXIMUM_PRONOUNCEABLE_NUMBER) {
            throw new IllegalArgumentException("Number must be between 0 and " + MAXIMUM_PRONOUNCEABLE_NUMBER + ".");
        }
        if (number == 0) return BELOW_TWENTY[0];
        return sayNumber(number).trim();
    }

    private String sayNumber(long number) {
        StringBuilder result = new StringBuilder();
        int magnitudeIndex = 0;

        while (number > 0) {
            int chunk = (int) (number % 1_000);
            if (chunk > 0) {
                result.insert(0, sayChunk(chunk) + (magnitudeIndex > 0 ? " " + MAGNITUDES[magnitudeIndex] : "") + " ");
            }
            number /= 1_000;
            magnitudeIndex++;
        }

        return result.toString().trim();
    }

    private String sayChunk(int number) {
        StringBuilder chunkResult = new StringBuilder();

        if (number >= 100) {
            chunkResult.append(BELOW_TWENTY[number / 100]).append(" hundred");
            number %= 100;
            if (number > 0) chunkResult.append(" ");
        }

        if (number >= 20) {
            chunkResult.append(TENS[number / 10]);
            number %= 10;
            if (number > 0) chunkResult.append("-");
        }

        if (number > 0) {
            chunkResult.append(BELOW_TWENTY[number]);
        }

        return chunkResult.toString();
    }
}