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
        // Iterate directly over the string characters to avoid creating a new char array.
        // This reduces memory allocation and garbage collection overhead.
        for (int i = 0; i < greeting.length(); i++) {
            char c = greeting.charAt(i);
            if (Character.isLowerCase(c)) {
                return false; // Contains a lowercase letter, so it's not shouting.
            }
            if (Character.isUpperCase(c)) {
                hasUppercase = true; // Found at least one uppercase letter.
            }
        }
        // It's shouting if there are no lowercase letters AND at least one uppercase letter.
        return hasUppercase;
    }
}