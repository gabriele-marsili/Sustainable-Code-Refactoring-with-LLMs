public class PangramChecker {

    public boolean isPangram(String input) {
        boolean[] alphabet = new boolean[26];
        int index = 0;
        for (int i = 0; i < input.length(); i++) {
            if (input.charAt(i) >= 'A' && input.charAt(i) <= 'Z') {
                index = input.charAt(i) - 'A';
            }
            else if (input.charAt(i) >= 'a' && input.charAt(i) <= 'z') {
                index = input.charAt(i) - 'a';
            }
            alphabet[index] = true;
        }
        for (int i = 0; i < 26; i++) {
            if (alphabet[i] == false) {
                return false;
            }
        }
        return true;
    }

}
