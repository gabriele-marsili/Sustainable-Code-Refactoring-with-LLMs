public class Bob {
    public String hey(String greeting) {
        greeting = greeting.trim();
        if (greeting.isEmpty()) {
            return "Fine. Be that way!";
        }
        
        boolean hasUppercase = false;
        boolean hasLowercase = false;
        
        for (int i = 0; i < greeting.length(); i++) {
            char c = greeting.charAt(i);
            if (Character.isLowerCase(c)) {
                hasLowercase = true;
                break;
            } else if (Character.isUpperCase(c)) {
                hasUppercase = true;
            }
        }
        
        boolean isShouting = hasUppercase && !hasLowercase;
        boolean isQuestion = greeting.charAt(greeting.length() - 1) == '?';
        
        if (isShouting && isQuestion) {
            return "Calm down, I know what I'm doing!";
        } else if (isShouting) {
            return "Whoa, chill out!";
        } else if (isQuestion) {
            return "Sure.";
        } else {
            return "Whatever.";
        }
    }

    private static boolean shouting(String greeting) {
        boolean hasUppercase = false;
        for (int i = 0; i < greeting.length(); i++) {
            char c = greeting.charAt(i);
            if (Character.isLowerCase(c)) return false;
            if (Character.isUpperCase(c)) hasUppercase = true;
        }
        return hasUppercase;
    }
}