class ReverseString {

    String reverse(String inputString) {
        if (inputString == null || inputString.isEmpty()) {
            return inputString;
        }
        StringBuilder reversedString = new StringBuilder(inputString.length());
        for (int i = inputString.length() - 1; i >= 0; i--) {
            reversedString.append(inputString.charAt(i));
        }
        return reversedString.toString();
    }
}