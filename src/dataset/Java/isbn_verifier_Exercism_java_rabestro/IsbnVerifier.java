import static java.lang.Character.getNumericValue;
import static java.util.stream.IntStream.range;

class IsbnVerifier {

    boolean isValid(String stringToVerify) {
        var digits = stringToVerify.replace("-", "");

        if (!digits.matches("\\d{9}[X\\d]")) {
            return false;
        }
        var checkSum = range(0, 9).map(i -> (10 - i) * getNumericValue(digits.charAt(i))).sum();
        checkSum += digits.charAt(9) == 'X' ? 10 : getNumericValue(digits.charAt(9));

        return checkSum % 11 == 0;
    }

}
