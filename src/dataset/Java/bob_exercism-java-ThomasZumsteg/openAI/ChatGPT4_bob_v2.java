public class Bob {
    public String hey(String greeting) {
        if (greeting == null || (greeting = greeting.trim()).isEmpty()) {
            return "Fine. Be that way!";
        }
        char lastChar = greeting.charAt(greeting.length() - 1);
        if (isShouting(greeting)) {
            return "Whoa, chill out!";
        }
        if (lastChar == '?') {
            return "Sure.";
        }
        return "Whatever.";
    }

    private static boolean isShouting(String greeting) {
        boolean hasUppercase = false;
        for (int i = 0, len = greeting.length(); i < len; i++) {
            char c = greeting.charAt(i);
            if (Character.isLowerCase(c)) return false;
            if (!hasUppercase && Character.isUpperCase(c)) hasUppercase = true;
        }
        return hasUppercase;
    }
}