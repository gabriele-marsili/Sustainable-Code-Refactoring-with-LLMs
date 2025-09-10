public class PhoneNumber {
    private final String strPhoneNumber;
    private String number; // Cache the cleaned number

    public PhoneNumber(String strPhoneNumber) {
        this.strPhoneNumber = strPhoneNumber;
        this.number = null; // Initialize cache
    }

    public String getNumber() {
        if (number != null) {
            return number; // Return cached value if available
        }

        String digits = strPhoneNumber.replaceAll("\\D", "");

        if (digits.length() == 11 && digits.charAt(0) == '1') {
            digits = digits.substring(1);
        }

        if (digits.length() != 10) {
            number = "0000000000"; // Cache the default value
            return number;
        }

        number = digits; // Cache the cleaned number
        return number;
    }

    public String getAreaCode() {
        String number = getNumber();
        return number.substring(0, 3);
    }

    public String pretty() {
        String number = getNumber();
        return "(" + number.substring(0, 3) + ") " + number.substring(3, 6) + "-" + number.substring(6, 10);
    }
}