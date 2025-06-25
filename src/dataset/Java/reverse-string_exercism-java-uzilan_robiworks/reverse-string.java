import java.lang.StringBuilder;

class ReverseString {

    String reverse(String inputString) {
        String output = new StringBuilder(inputString).reverse().toString();
        return output;
    }

}
