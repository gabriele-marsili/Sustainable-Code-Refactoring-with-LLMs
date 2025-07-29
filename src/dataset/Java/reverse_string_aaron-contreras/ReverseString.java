class ReverseString {

    String reverse(String inputString) {

        if (inputString.isEmpty()) {
            return inputString;
        }
        StringBuilder builder = new StringBuilder();

        for (int i = inputString.length() - 1; i>= 0; i--) {
            builder.append(inputString.charAt(i));
        }
        return builder.toString();
    }
}
