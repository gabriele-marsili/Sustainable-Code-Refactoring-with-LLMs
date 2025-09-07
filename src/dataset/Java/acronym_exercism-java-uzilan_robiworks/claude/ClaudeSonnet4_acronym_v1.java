class Acronym {
    private String phrase;

    Acronym(String phrase) {
        this.phrase = phrase;
    }

    String get() {
        StringBuilder abbreviation = new StringBuilder();
        int length = phrase.length();
        boolean takeNext = true;
        
        for (int i = 0; i < length; i++) {
            char c = phrase.charAt(i);
            
            if (Character.isLetter(c)) {
                if (takeNext) {
                    abbreviation.append(Character.toUpperCase(c));
                    takeNext = false;
                }
            } else if (c != '\'') {
                takeNext = true;
            }
        }
        
        return abbreviation.toString();
    }
}