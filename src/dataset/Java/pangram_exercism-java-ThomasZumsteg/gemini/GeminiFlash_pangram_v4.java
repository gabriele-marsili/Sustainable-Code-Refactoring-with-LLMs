public class Pangrams {
    public static boolean isPangram(String words) {
        int seenLetters = 0;
        final int ALL_LETTERS_MASK = (1 << 26) - 1;

        for (int i = 0; i < words.length(); i++) {
            char c = words.charAt(i);

            if (c >= 'A' && c <= 'Z') {
                c = (char) (c - 'A' + 'a');
            }

            if (c >= 'a' && c <= 'z') {
                seenLetters |= (1 << (c - 'a'));
                if (seenLetters == ALL_LETTERS_MASK) {
                    return true;
                }
            }
        }
        return seenLetters == ALL_LETTERS_MASK;
    }
}