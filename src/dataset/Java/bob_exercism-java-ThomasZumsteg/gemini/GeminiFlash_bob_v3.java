public class Bob {
    public String hey(String greeting) {
        greeting = greeting.trim();

        if (greeting.isEmpty()) {
            return "Fine. Be that way!";
        } else if (Bob.shouting(greeting)) {
            return "Whoa, chill out!";
        } else if (greeting.charAt(greeting.length() - 1) == '?') {
            return "Sure.";
        } else {
            return "Whatever.";
        }
    }

    private static boolean shouting(String greeting) {
        boolean hasUppercaseLetter = false;

        for (int i = 0; i < greeting.length(); i++) {
            char c = greeting.charAt(i);

            if (Character.isLetter(c)) {
                if (Character.isLowerCase(c)) {
                    return false;
                }
                if (Character.isUpperCase(c)) {
                    hasUppercaseLetter = true;
                }
            }
        }
        return hasUppercaseLetter;
    }
}