public class PangramChecker {

    public boolean isPangram(String input) {
        if (input == null || input.length() < 26) return false;
        boolean[] alphabet = new boolean[26];
        int count = 0;
        for (int i = 0, len = input.length(); i < len; i++) {
            char c = input.charAt(i);
            if (c >= 'A' && c <= 'Z') {
                c = (char)(c + 32);
            }
            if (c >= 'a' && c <= 'z') {
                int index = c - 'a';
                if (!alphabet[index]) {
                    alphabet[index] = true;
                    count++;
                    if (count == 26) return true;
                }
            }
        }
        return false;
    }

}