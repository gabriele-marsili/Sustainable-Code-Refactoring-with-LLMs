import java.util.Arrays;

public class Luhn {
    private final long code;

    public Luhn(Long code) {
        this.code = code;
    }

    public Luhn(Integer code) {
        this.code = (long) code;
    }

    public int getCheckDigit() {
        return (int) (code % 10L);
    }

    public int[] getAddends() {
        String strCode = Long.toString(code);
        int len = strCode.length();
        int[] intCode = new int[len];

        for (int i = len - 1, j = 0; i >= 0; i--, j++) {
            int n = strCode.charAt(i) - '0';
            if ((j % 2) == 0) {
                intCode[i] = n;
            } else {
                n *= 2;
                intCode[i] = (n > 9) ? n - 9 : n;
            }
        }
        return intCode;
    }

    public int getCheckSum() {
        int[] addends = getAddends();
        int sum = 0;
        for (int addend : addends) {
            sum += addend;
        }
        return sum;
    }

    public boolean isValid() {
        return getCheckSum() % 10 == 0;
    }

    public static long create(long code) {
        long codeWithZero = code * 10;
        int checkSum = new Luhn(codeWithZero).getCheckSum() % 10;
        return codeWithZero + (checkSum == 0 ? 0L : (10L - (long) checkSum));
    }
}