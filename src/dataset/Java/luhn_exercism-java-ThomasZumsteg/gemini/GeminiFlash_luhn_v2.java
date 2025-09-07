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
            int n = Character.getNumericValue(strCode.charAt(len - 1 - i));
            if ((i + 1) % 2 == 1) {
                intCode[len - 1 - i] = n;
            } else {
                int doubled = n * 2;
                intCode[len - 1 - i] = doubled > 9 ? doubled - 9 : doubled;
            }
        }
        // Remove print statements as they are side effects and impact performance
        //System.out.format("%d ", code);
        //System.out.println(intCode);
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
        long newCode = code * 10;
        int checkSum = new Luhn(newCode).getCheckSum() % 10;
        return newCode + (checkSum == 0 ? 0L : (10L - (long) checkSum));
    }
}