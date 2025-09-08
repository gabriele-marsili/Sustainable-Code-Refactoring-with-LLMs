class IsogramChecker {

    boolean isIsogram(String phrase) {
        int len = phrase.length();
        boolean[] seen = new boolean[26];
        
        for (int i = 0; i < len; i++) {
            char c = phrase.charAt(i);
            if (c == ' ' || c == '-') {
                continue;
            }
            
            // Convert to lowercase inline
            if (c >= 'A' && c <= 'Z') {
                c = (char)(c + 32);
            }
            
            int index = c - 'a';
            if (seen[index]) {
                return false;
            }
            seen[index] = true;
        }
        return true;
    }
}