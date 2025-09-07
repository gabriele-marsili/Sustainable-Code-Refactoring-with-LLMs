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

        for (int i = 0; i < len; i++) {
            int n = Character.getNumericValue(strCode.charAt(i));
            if ((len - i) % 2 == 0) {
                n *= 2;
                if (n > 9) {
                    n -= 9;
                }
            }
            intCode[i] = n;
        }

        // Reverse the array for original logic compatibility
        int[] reversedIntCode = new int[len];
        for (int i = 0; i < len; i++) {
            reversedIntCode[i] = intCode[len - 1 - i];
        }

        // Remove print statements for production code
        // System.out.format("%d ", code);
        // System.out.println(Arrays.toString(reversedIntCode));

        return reversedIntCode;
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
        long newCode = code * 10;
        int checkSum = new Luhn(newCode).getCheckSum() % 10;
        return newCode + (checkSum == 0 ? 0L : (10L - (long) checkSum));
    }
}