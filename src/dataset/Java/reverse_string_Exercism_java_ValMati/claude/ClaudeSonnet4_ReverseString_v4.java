class ReverseString {

    String reverse(String inputString) {
        if (inputString == null || inputString.length() <= 1) {
            return inputString;
        }
        
        return new StringBuilder(inputString).reverse().toString();
    }

}