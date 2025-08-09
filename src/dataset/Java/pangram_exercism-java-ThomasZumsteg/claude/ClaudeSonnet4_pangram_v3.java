public class Pangrams {
    public static boolean isPangram(String words) {
        if (words == null || words.length() < 26) {
            return false;
        }
        
        boolean[] seen = new boolean[26];
        int foundCount = 0;
        
        for (int i = 0; i < words.length() && foundCount < 26; i++) {
            char c = words.charAt(i);
            if (c >= 'A' && c <= 'Z') {
                int index = c - 'A';
                if (!seen[index]) {
                    seen[index] = true;
                    foundCount++;
                }
            } else if (c >= 'a' && c <= 'z') {
                int index = c - 'a';
                if (!seen[index]) {
                    seen[index] = true;
                    foundCount++;
                }
            }
        }
        
        return foundCount == 26;
    }
}