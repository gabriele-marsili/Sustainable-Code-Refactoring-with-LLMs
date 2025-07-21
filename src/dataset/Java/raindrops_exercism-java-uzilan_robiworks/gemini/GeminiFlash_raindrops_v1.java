class RaindropConverter {

    private static final String PLING = "Pling";
    private static final String PLANG = "Plang";
    private static final String PLONG = "Plong";

    String convert(int number) {
        StringBuilder outputBuilder = new StringBuilder();

        if (number % 3 == 0) {
            outputBuilder.append(PLING);
        }
        if (number % 5 == 0) {
            outputBuilder.append(PLANG);
        }
        if (number % 7 == 0) {
            outputBuilder.append(PLONG);
        }

        if (outputBuilder.length() == 0) {
            return String.valueOf(number);
        } else {
            return outputBuilder.toString();
        }
    }
}