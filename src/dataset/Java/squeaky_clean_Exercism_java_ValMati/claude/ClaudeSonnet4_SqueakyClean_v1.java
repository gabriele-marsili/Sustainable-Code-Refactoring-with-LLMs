class SqueakyClean {
    static String clean(String identifier) {
        if (identifier.isEmpty()) {
            return identifier;
        }
        
        StringBuilder result = new StringBuilder(identifier.length());
        boolean prevHyphen = false;

        for (int i = 0; i < identifier.length(); i++) {
            char c = identifier.charAt(i);
            
            if (Character.isLetter(c)) {
                result.append(prevHyphen ? Character.toUpperCase(c) : c);
            } else if (c == ' ') {
                result.append('_');
            } else if (c == '4') {
                result.append('a');
            } else if (c == '3') {
                result.append('e');
            } else if (c == '0') {
                result.append('o');
            } else if (c == '1') {
                result.append('l');
            } else if (c == '7') {
                result.append('t');
            } else if (Character.isDigit(c)) {
                result.append(c);
            }

            prevHyphen = c == '-';
        }

        return result.toString();
    }

    private static char numberToLetter(char c) {
        return switch (c) {
            case '4' -> 'a';
            case '3' -> 'e';
            case '0' -> 'o';
            case '1' -> 'l';
            case '7' -> 't';
            default -> ' ';
        };
    }
}