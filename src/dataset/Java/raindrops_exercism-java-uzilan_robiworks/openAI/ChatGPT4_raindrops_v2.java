class RaindropConverter {

    String convert(int number) {
        boolean divisible = false;
        StringBuilder output = new StringBuilder(8);
        if ((number % 3) == 0) {
            output.append("Pling");
            divisible = true;
        }
        if ((number % 5) == 0) {
            output.append("Plang");
            divisible = true;
        }
        if ((number % 7) == 0) {
            output.append("Plong");
            divisible = true;
        }
        return divisible ? output.toString() : Integer.toString(number);
    }

}
