class IsogramChecker {

    boolean isIsogram(String phrase) {
        phrase = phrase.toLowerCase();
        int len = phrase.length();
        boolean[] seen = new boolean[26];

        for (int i = 0; i < len; i++) {
            char c = phrase.charAt(i);
            if (c >= 'a' && c <= 'z') {
                int index = c - 'a';
                if (seen[index]) {
                    return false;
                }
                seen[index] = true;
            }
        }
        return true;
    }
}