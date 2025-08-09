public class Bob {
    public String hey(String greeting) {
        greeting = greeting.trim();
        if( greeting.isEmpty() ) {
            return "Fine. Be that way!";
        } else if( Bob.shouting(greeting)) {
            return "Whoa, chill out!";
        } else if( greeting.charAt(greeting.length() - 1) == '?') {
            return "Sure.";
        } else {
            return "Whatever.";
        }
    }

    private static boolean shouting(String greeting) {
        boolean hasUppercase = false;
        // Iterate directly over the string to avoid creating a new char array,
        // reducing memory allocation and improving performance/energy efficiency.
        for (int i = 0; i < greeting.length(); i++) {
            char c = greeting.charAt(i);
            if (Character.isLowerCase(c)) {
                return false; // Found a lowercase character, so it's not shouting
            }
            if (Character.isUpperCase(c)) {
                hasUppercase = true; // Found at least one uppercase character
            }
        }
        // It's shouting if there were no lowercase characters AND at least one uppercase character
        return hasUppercase;
    }
}