class Proverb {
    private final String[] words;

    Proverb(String[] words) {
        this.words = words;
    }

    String recite() {
        if (words.length == 0) {
            return "";
        }
        StringBuilder result = new StringBuilder();
        String pattern = "For want of a %s the %s was lost.\n";
        String finishLine = "And all for the want of a %s.";
        if (words.length > 1) {
            for (int i = 0; i < words.length - 1; i++) {
                result.append(String.format(pattern, words[i], words[i + 1]));
            }
        }
        result.append(String.format(finishLine, words[0]));
        return result.toString();
    }

}
