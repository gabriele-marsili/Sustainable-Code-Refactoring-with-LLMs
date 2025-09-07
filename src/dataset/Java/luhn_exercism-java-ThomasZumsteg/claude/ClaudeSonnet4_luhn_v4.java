import java.util.Arrays;

public class Luhn {
    private final long code;

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
            int digit = (int)(temp % 10);
            temp /= 10;
            
            if((length - i) % 2 == 1) {
                intCode[i] = digit;
            } else {
                int doubled = digit << 1;
                intCode[i] = (doubled < 10) ? doubled : doubled - 9;
            }
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
            int digit = (int)(temp % 10);
            temp /= 10;
            
            if((length - i) % 2 == 1) {
                sum += digit;
            } else {
                int doubled = digit << 1;
                sum += (doubled < 10) ? doubled : doubled - 9;
            }
        }
        
        return sum;
    }

    public boolean isValid() {
        return getCheckSum() % 10 == 0;
    }

    public static long create(long code) {
        long temp = code * 10;
        int length = (int)(Math.log10(temp) + 1);
        int sum = 0;
        long workingCode = temp;
        
        for(int i = length - 1; i >= 0; i--) {
            int digit = (int)(workingCode % 10);
            workingCode /= 10;
            
            if((length - i) % 2 == 1) {
                sum += digit;
            } else {
                int doubled = digit << 1;
                sum += (doubled < 10) ? doubled : doubled - 9;
            }
        }
        
        int checkSum = sum % 10;
        return temp + (checkSum == 0 ? 0L : (10L - checkSum));
    }
}