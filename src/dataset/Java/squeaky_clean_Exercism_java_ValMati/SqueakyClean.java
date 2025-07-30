class SqueakyClean {
    static String clean(String identifier) {
        StringBuilder result = new StringBuilder();
        boolean prevHyphen = false;
        char charFromLetter;

        for (char c : identifier.toCharArray()) {
            if (Character.isLetter(c)) {
                result.append(prevHyphen ? Character.toUpperCase(c) : c);
            } else if (c == ' ') {
                result.append('_');
            } else if ((charFromLetter = numberToLetter(c)) != ' ') {
                result.append(charFromLetter);
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
