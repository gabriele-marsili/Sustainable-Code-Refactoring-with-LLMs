class ReverseString {

    String reverse(String inputString) {
        if (inputString == null || inputString.isEmpty()) {
            return inputString;
        }

        return new StringBuilder(inputString).reverse().toString();
    }
}