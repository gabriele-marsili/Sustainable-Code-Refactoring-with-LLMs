public class PhoneNumber {
    private final String strPhoneNumber;
    private String cleanedNumber;

    public PhoneNumber(String strPhoneNumber) {
        this.strPhoneNumber = strPhoneNumber;
        this.cleanedNumber = null;
    }

    public String getNumber() {
        if (cleanedNumber == null) {
            String digits = strPhoneNumber.replaceAll("\\D+", "");
            if (digits.length() == 11 && digits.charAt(0) == '1') {
                digits = digits.substring(1);
            }
            cleanedNumber = (digits.length() == 10) ? digits : "0000000000";
        }
        return cleanedNumber;
    }

    public String getAreaCode() {
        String number = getNumber();
        return number.substring(0, 3);
    }

    public String pretty() {
        String number = getNumber();
        return "(" + number.substring(0, 3) + ") " +
               number.substring(3, 6) + "-" +
               number.substring(6, 10);
    }
}