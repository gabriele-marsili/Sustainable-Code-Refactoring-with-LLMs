public class Pangrams {
    public static boolean isPangram(String words) {
        if (words.length() < 26) {
            return false;
        }
        
        boolean[] seen = new boolean[26];
        int count = 0;
        
        for (int i = 0; i < words.length(); i++) {
            char c = words.charAt(i);
            if (c >= 'A' && c <= 'Z') {
                c = (char)(c + 32);
            }
            if (c >= 'a' && c <= 'z') {
                int index = c - 'a';
                if (!seen[index]) {
                    seen[index] = true;
                    count++;
                    if (count == 26) {
                        return true;
                    }
                }
            }
        }
        
        return count == 26;
    }
}