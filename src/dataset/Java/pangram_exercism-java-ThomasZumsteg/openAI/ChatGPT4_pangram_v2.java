public class Pangrams {
    public static boolean isPangram(String words) {
        if (words == null || words.length() < 26) return false;
        boolean[] seen = new boolean[26];
        int count = 0;
        for (int i = 0, len = words.length(); i < len; i++) {
            char c = words.charAt(i);
            if (c >= 'A' && c <= 'Z') c += 32;
            if (c >= 'a' && c <= 'z') {
                int idx = c - 'a';
                if (!seen[idx]) {
                    seen[idx] = true;
                    if (++count == 26) return true;
                }
            }
        }
        return false;
    }
}