public class PangramChecker {

    public boolean isPangram(String input) {
        if (input == null || input.length() < 26) return false;
        int seen = 0;
        for (int i = 0, len = input.length(); i < len; i++) {
            char c = input.charAt(i);
            if (c >= 'A' && c <= 'Z') {
                seen |= 1 << (c - 'A');
            } else if (c >= 'a' && c <= 'z') {
                seen |= 1 << (c - 'a');
            }
            if (seen == 0x3FFFFFF) return true;
        }
        return false;
    }

}