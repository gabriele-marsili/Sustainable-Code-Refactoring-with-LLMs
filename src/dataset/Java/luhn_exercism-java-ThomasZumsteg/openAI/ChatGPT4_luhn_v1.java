public class Luhn {
    private final long code;

    public Luhn(Long code) {
        this.code = code;
    }

    public Luhn(Integer code) {
        this.code = code;
    }

    public int getCheckDigit() {
        return (int) (code % 10);
    }

    public int[] getAddends() {
        long tempCode = code;
        int length = (int) Math.log10(tempCode) + 1;
        int[] addends = new int[length];
        boolean doubleDigit = false;

        for (int i = length - 1; i >= 0; i--) {
            int digit = (int) (tempCode % 10);
            tempCode /= 10;

            if (doubleDigit) {
                digit = digit < 5 ? digit * 2 : digit * 2 - 9;
            }
            addends[i] = digit;
            doubleDigit = !doubleDigit;
        }
        return addends;
    }

    public int getCheckSum() {
        int sum = 0;
        long tempCode = code;
        boolean doubleDigit = false;

        while (tempCode > 0) {
            int digit = (int) (tempCode % 10);
            tempCode /= 10;

            if (doubleDigit) {
                digit = digit < 5 ? digit * 2 : digit * 2 - 9;
            }
            sum += digit;
            doubleDigit = !doubleDigit;
        }
        return sum;
    }

    public boolean isValid() {
        return getCheckSum() % 10 == 0;
    }

    public static long create(long code) {
        int checkSum = new Luhn(code * 10).getCheckSum() % 10;
        return code * 10 + (checkSum == 0 ? 0 : 10 - checkSum);
    }
}