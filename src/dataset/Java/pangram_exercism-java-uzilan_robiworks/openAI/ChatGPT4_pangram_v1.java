public class PangramChecker {

    public boolean isPangram(String input) {
        int seen = 0;
        int count = 0;
        for (int i = 0, len = input.length(); i < len; i++) {
            char c = input.charAt(i);
            if (c >= 'A' && c <= 'Z') {
                c = (char)(c + 32); // convert to lowercase
            }
            if (c >= 'a' && c <= 'z') {
                int bit = 1 << (c - 'a');
                if ((seen & bit) == 0) {
                    seen |= bit;
                    count++;
                    if (count == 26) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

}