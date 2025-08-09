public class Bob {
    public String hey(String greeting) {
        greeting = greeting.trim();
        if (greeting.isEmpty()) {
            return "Fine. Be that way!";
        }
        
        boolean hasUppercase = false;
        boolean hasLowercase = false;
        boolean isQuestion = false;
        
        // Single pass through the string
        for (int i = 0; i < greeting.length(); i++) {
            char c = greeting.charAt(i);
            if (Character.isLowerCase(c)) {
                hasLowercase = true;
            } else if (Character.isUpperCase(c)) {
                hasUppercase = true;
            }
            
            // Check if it's a question on the last character
            if (i == greeting.length() - 1 && c == '?') {
                isQuestion = true;
            }
        }
        
        boolean isShouting = hasUppercase && !hasLowercase;
        
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
}