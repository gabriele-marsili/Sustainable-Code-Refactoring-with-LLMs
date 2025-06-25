class Acronym {
    private String phrase;

    Acronym(String phrase) {
        this.phrase = phrase;
    }

    String get() {
        String abbreviation = "";
        phrase = phrase.replaceAll("[^a-zA-Z']", " ").toUpperCase(); // regex to replace every non-alphabetical character except an apostrophe with a space
        String[] words = phrase.split("\\s+"); // splits string into array even if it contains multiple spaces
        for (int i = 0; i < words.length; i++) {
            abbreviation += words[i].substring(0, 1);
        }
        return abbreviation;
    }

}
