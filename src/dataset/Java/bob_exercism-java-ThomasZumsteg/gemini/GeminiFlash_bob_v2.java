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
        // Iterate directly over the String using charAt(i) to avoid creating
        // an intermediate char array with toCharArray(), which saves memory
        // allocation and copying overhead, improving efficiency and reducing energy consumption.
        for (int i = 0; i < greeting.length(); i++) {
            char c = greeting.charAt(i);
            if (Character.isLowerCase(c)) {
                // If any lowercase character is found, it's not shouting.
                return false;
            }
            if (Character.isUpperCase(c)) {
                // Mark that at least one uppercase character has been found.
                hasUppercase = true;
            }
        }
        // It's shouting if no lowercase characters were found AND at least one uppercase character was found.
        // This handles cases like "123" (not shouting, as hasUppercase remains false)
        // versus "HELLO!" (shouting, as hasUppercase becomes true).
        return hasUppercase;
    }
}