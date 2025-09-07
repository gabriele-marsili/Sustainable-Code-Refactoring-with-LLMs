class SqueakyClean {
    static String clean(String identifier) {
        int len = identifier.length();
        StringBuilder result = new StringBuilder(len);
        boolean prevHyphen = false;

        for (int i = 0; i < len; i++) {
            char c = identifier.charAt(i);
            if (Character.isLetter(c)) {
                result.append(prevHyphen ? Character.toUpperCase(c) : c);
                prevHyphen = false; // Reset after use
            } else if (c == ' ') {
                result.append('_');
                prevHyphen = false; // Reset after use
            } else if (c >= '0' && c <= '7') {
                char charFromLetter = numberToLetter(c);
                if (charFromLetter != ' ') {
                    result.append(charFromLetter);
                    prevHyphen = false; // Reset after use
                } else if (Character.isDigit(c)) {
                    result.append(c);
                    prevHyphen = false; // Reset after use
                }
            } else {
                prevHyphen = c == '-';
            }
        }

        return result.toString();
    }

    private static char numberToLetter(char c) {
        switch (c) {
            case '4': return 'a';
            case '3': return 'e';
            case '0': return 'o';
            case '1': return 'l';
            case '7': return 't';
            default: return ' ';
        }
    }
}