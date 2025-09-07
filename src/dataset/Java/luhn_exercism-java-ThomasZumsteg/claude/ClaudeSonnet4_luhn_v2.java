import java.util.Arrays;

public class Luhn {
    private long code;

    public Luhn(Long code) {
        this.code = code;
    }

    public Luhn(Integer code){
        this.code = code.longValue();
    }

    public int getCheckDigit() {
        return (int)(code % 10L);
    }

    public int[] getAddends() {
        long temp = code;
        int length = (temp == 0) ? 1 : (int)(Math.log10(temp) + 1);
        int[] intCode = new int[length];
        
        for(int i = length - 1; i >= 0; i--) {
            int n = (int)(temp % 10);
            temp /= 10;
            
            if((length - i) % 2 == 1)
                intCode[i] = n;
            else
                intCode[i] = (n < 5) ? n * 2 : n * 2 - 9;
        }
        
        System.out.format("%d ", code);
        System.out.println(intCode);
        return intCode;
    }

    public int getCheckSum() {
        long temp = code;
        int length = (temp == 0) ? 1 : (int)(Math.log10(temp) + 1);
        int sum = 0;
        
        for(int i = length - 1; i >= 0; i--) {
            int n = (int)(temp % 10);
            temp /= 10;
            
            if((length - i) % 2 == 1)
                sum += n;
            else
                sum += (n < 5) ? n * 2 : n * 2 - 9;
        }
        
        return sum;
    }

    public boolean isValid() {
        return getCheckSum() % 10 == 0;
    }

    public static long create(long code) {
        int checkSum = new Luhn(code * 10).getCheckSum() % 10;
        return (10L * code) + (checkSum == 0 ? 0L : (10L - checkSum));
    }
}