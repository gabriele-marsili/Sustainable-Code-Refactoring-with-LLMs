public class PhoneNumber {
    private final String strPhoneNumber;
    private String formattedNumber;

    public PhoneNumber(String strPhoneNumber) {
        this.strPhoneNumber = strPhoneNumber;
        this.formattedNumber = null;
    }

    public String getNumber() {
        if (formattedNumber != null) {
            return formattedNumber;
        }

        String digits = strPhoneNumber.replaceAll("\\D+", "");
        if (digits.length() == 11 && digits.startsWith("1")) {
            digits = digits.substring(1);
        }

        if (digits.length() != 10) {
            formattedNumber = "0000000000";
        } else {
            formattedNumber = digits;
        }

        return formattedNumber;
    }

    public String getAreaCode() {
        return getNumber().substring(0, 3);
    }

    public String pretty() {
        String digits = getNumber();
        return "(" + digits.substring(0, 3) + ") " + digits.substring(3, 6) + "-" + digits.substring(6, 10);
    }
}