class IsogramChecker {

    boolean isIsogram(String phrase) {
        int len = phrase.length();
        boolean[] seen = new boolean[26];
        
        for (int i = 0; i < len; i++) {
            char c = phrase.charAt(i);
            if (c == ' ' || c == '-') {
                continue;
            }
            
            // Convert to lowercase index
            int index;
            if (c >= 'A' && c <= 'Z') {
                index = c - 'A';
            } else if (c >= 'a' && c <= 'z') {
                index = c - 'a';
            } else {
                continue;
            }
            
            if (seen[index]) {
                return false;
            }
            seen[index] = true;
        }
        return true;
    }
}