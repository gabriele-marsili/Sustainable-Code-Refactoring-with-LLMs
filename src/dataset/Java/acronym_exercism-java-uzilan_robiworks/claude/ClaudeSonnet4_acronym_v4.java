class Acronym {
    private final String phrase;

    Acronym(String phrase) {
        this.phrase = phrase;
    }

    String get() {
        StringBuilder abbreviation = new StringBuilder();
        boolean nextIsFirst = true;
        
        for (int i = 0; i < phrase.length(); i++) {
            char c = phrase.charAt(i);
            
            if (Character.isLetter(c)) {
                if (nextIsFirst) {
                    abbreviation.append(Character.toUpperCase(c));
                    nextIsFirst = false;
                }
            } else if (c != '\'') {
                nextIsFirst = true;
            }
        }
        
        return abbreviation.toString();
    }
}