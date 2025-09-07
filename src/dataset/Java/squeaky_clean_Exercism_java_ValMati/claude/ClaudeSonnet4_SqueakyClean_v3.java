class SqueakyClean {
    private static final char[] NUMBER_TO_LETTER = new char[256];
    
    static {
        for (int i = 0; i < NUMBER_TO_LETTER.length; i++) {
            NUMBER_TO_LETTER[i] = ' ';
        }
        NUMBER_TO_LETTER['4'] = 'a';
        NUMBER_TO_LETTER['3'] = 'e';
        NUMBER_TO_LETTER['0'] = 'o';
        NUMBER_TO_LETTER['1'] = 'l';
        NUMBER_TO_LETTER['7'] = 't';
    }

    static String clean(String identifier) {
        if (identifier == null || identifier.isEmpty()) {
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
            } else if (c < NUMBER_TO_LETTER.length && NUMBER_TO_LETTER[c] != ' ') {
                result.append(NUMBER_TO_LETTER[c]);
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