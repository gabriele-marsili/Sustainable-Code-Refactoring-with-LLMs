public class PhoneNumber {
    private String strPhoneNumber;
    private String cachedNumber;

    public PhoneNumber(String strPhoneNumber) {
        this.strPhoneNumber = strPhoneNumber;
    }

    public String getNumber() {
        if (cachedNumber != null) {
            return cachedNumber;
        }
        
        StringBuilder digits = new StringBuilder();
        for (int i = 0; i < strPhoneNumber.length(); i++) {
            char c = strPhoneNumber.charAt(i);
            if (c >= '0' && c <= '9') {
                digits.append(c);
            }
        }
        
        int length = digits.length();
        if (length == 11 && digits.charAt(0) == '1') {
            digits.deleteCharAt(0);
            length = 10;
        }
        
        if (length != 10) {
            cachedNumber = "0000000000";
        } else {
            cachedNumber = digits.toString();
        }
        
        return cachedNumber;
    }

    public String getAreaCode() {
        String number = getNumber();
        return number.substring(0, 3);
    }

    public String pretty() {
        String digits = getNumber();
        return new StringBuilder(14)
            .append('(')
            .append(digits, 0, 3)
            .append(") ")
            .append(digits, 3, 6)
            .append('-')
            .append(digits, 6, 10)
            .toString();
    }
}