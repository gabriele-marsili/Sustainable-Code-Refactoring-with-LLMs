class SqueakyClean {
    static String clean(String identifier) {
        StringBuilder result = new StringBuilder();
        boolean prevHyphen = false;

        for (int i = 0, len = identifier.length(); i < len; i++) {
            char c = identifier.charAt(i);

            if (Character.isLetter(c)) {
                result.append(prevHyphen ? Character.toUpperCase(c) : c);
                prevHyphen = false;
            } else if (c == ' ') {
                result.append('_');
                prevHyphen = false;
            } else if (c == '-') {
                prevHyphen = true;
            } else if ("43017".indexOf(c) >= 0) {
                result.append(numberToLetter(c));
                prevHyphen = false;
            } else if (Character.isDigit(c)) {
                result.append(c);
                prevHyphen = false;
            }
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