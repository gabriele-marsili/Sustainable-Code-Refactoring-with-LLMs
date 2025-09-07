import java.util.stream.IntStream;

public class Luhn {
    private final long code;

    public Luhn(Long code) {
        this.code = code;
    }

    public Luhn(Integer code) {
        this.code = code.longValue();
    }

    public int getCheckDigit() {
        return (int) (code % 10);
    }

    public int[] getAddends() {
        String strCode = Long.toString(code);
        int length = strCode.length();
        int[] addends = new int[length];
        for (int i = length - 1; i >= 0; i--) {
            int n = strCode.charAt(i) - '0';
            addends[i] = ((length - i) % 2 == 0) ? (n < 5 ? n * 2 : n * 2 - 9) : n;
        }
        return addends;
    }

    public int getCheckSum() {
        return IntStream.of(getAddends()).sum();
    }

    public boolean isValid() {
        return getCheckSum() % 10 == 0;
    }

    public static long create(long code) {
        int checkSum = new Luhn(code * 10).getCheckSum() % 10;
        return code * 10 + (checkSum == 0 ? 0 : 10 - checkSum);
    }
}