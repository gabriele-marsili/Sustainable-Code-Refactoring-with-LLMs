class LuhnValidator {

    boolean isValid(String candidate) {
        var number = candidate.replaceAll(" ", "");
        if (!number.matches("\\d{2,}")) {
            return false;
        }
        var sum = 0;
        var isEven = number.length() % 2 == 0;
        for (var symbol : number.toCharArray()) {
            var digit = Character.getNumericValue(symbol);
            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            isEven = !isEven;
        }
        return sum % 10 == 0;
    }
}
