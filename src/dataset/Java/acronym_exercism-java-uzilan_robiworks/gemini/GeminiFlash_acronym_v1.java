class Acronym {
    private final String phrase;

    Acronym(String phrase) {
        this.phrase = phrase;
    }

    String get() {
        StringBuilder abbreviation = new StringBuilder();
        boolean firstChar = true;
        for (int i = 0; i < phrase.length(); i++) {
            char currentChar = phrase.charAt(i);
            if (Character.isLetter(currentChar)) {
                if (firstChar) {
                    abbreviation.append(Character.toUpperCase(currentChar));
                    firstChar = false;
                }
            } else if (currentChar == ' ' || currentChar == '-' || currentChar == '_') {
                firstChar = true;
            }
        }
        return abbreviation.toString();
    }
}