class Acronym {
    private final String phrase;

    Acronym(String phrase) {
        this.phrase = phrase;
    }

    String get() {
        StringBuilder abbreviation = new StringBuilder();
        boolean newWord = true;
        for (char c : phrase.toCharArray()) {
            if (Character.isLetter(c)) {
                if (newWord) {
                    abbreviation.append(Character.toUpperCase(c));
                    newWord = false;
                }
            } else {
                newWord = true;
            }
        }
        return abbreviation.toString();
    }
}