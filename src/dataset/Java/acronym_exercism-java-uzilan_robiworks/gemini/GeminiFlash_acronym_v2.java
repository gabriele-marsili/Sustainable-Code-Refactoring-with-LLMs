class Acronym {
    private final String phrase;

    Acronym(String phrase) {
        this.phrase = phrase;
    }

    String get() {
        StringBuilder abbreviation = new StringBuilder();
        String[] words = phrase.replaceAll("[^a-zA-Z']", " ").toUpperCase().split("\\s+");
        for (String word : words) {
            abbreviation.append(word.charAt(0));
        }
        return abbreviation.toString();
    }
}