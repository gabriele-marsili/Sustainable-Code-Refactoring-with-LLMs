class SqueakyClean {
    static String clean(String identifier) {
        char[] chars = identifier.toCharArray();
        char[] result = new char[chars.length];
        int resultIndex = 0;
        boolean prevHyphen = false;

        for (char c : chars) {
            if (Character.isLetter(c)) {
                result[resultIndex++] = prevHyphen ? Character.toUpperCase(c) : c;
            } else if (c == ' ') {
                result[resultIndex++] = '_';
            } else if (c == '4') {
                result[resultIndex++] = 'a';
            } else if (c == '3') {
                result[resultIndex++] = 'e';
            } else if (c == '0') {
                result[resultIndex++] = 'o';
            } else if (c == '1') {
                result[resultIndex++] = 'l';
            } else if (c == '7') {
                result[resultIndex++] = 't';
            } else if (Character.isDigit(c)) {
                result[resultIndex++] = c;
            }

            prevHyphen = c == '-';
        }

        return new String(result, 0, resultIndex);
    }
}