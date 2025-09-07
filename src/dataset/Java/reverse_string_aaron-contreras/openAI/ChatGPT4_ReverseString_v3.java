class ReverseString {

    String reverse(String inputString) {
        if (inputString.isEmpty()) {
            return inputString;
        }
        return new StringBuilder(inputString).reverse().toString();
    }
}