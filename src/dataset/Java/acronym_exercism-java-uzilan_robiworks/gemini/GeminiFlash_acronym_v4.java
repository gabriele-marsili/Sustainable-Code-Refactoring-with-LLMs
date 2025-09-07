class Acronym {
    private final String phrase;

    Acronym(String phrase) {
        this.phrase = phrase;
    }

    String get() {
        StringBuilder abbreviation = new StringBuilder();
        String cleanedPhrase = phrase.replaceAll("[^a-zA-Z']", " ").toUpperCase();
        String[] words = cleanedPhrase.split("\\s+");

        for (String word : words) {
            if (!word.isEmpty()) {
                abbreviation.append(word.charAt(0));
            }
        }

        return abbreviation.toString();
    }
}