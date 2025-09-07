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

        for (int i = len - 1, j = 1; i >= 0; i--, j++) {
            int n = strCode.charAt(i) - '0';
            if ((j & 1) == 1) {
                intCode[i] = n;
            } else {
                n *= 2;
                intCode[i] = (n > 9) ? n - 9 : n;
            }
        }
        return intCode;
    }

    public int getCheckSum() {
        int sum = 0;
        int[] addends = getAddends();
        for (int addend : addends) {
            sum += addend;
        }
        return sum;
    }

    public boolean isValid() {
        return getCheckSum() % 10 == 0;
    }

    public static long create(long code) {
        long tentativeCode = code * 10;
        int checkSum = new Luhn(tentativeCode).getCheckSum() % 10;
        return tentativeCode + (checkSum == 0 ? 0L : (10L - (long) checkSum));
    }
}