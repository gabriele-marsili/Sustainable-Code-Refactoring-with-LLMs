class Acronym {
    private final String phrase;

    Acronym(String phrase) {
        this.phrase = phrase;
    }

    String get() {
        if (phrase == null || phrase.isEmpty()) {
            return "";
        }
        
        StringBuilder abbreviation = new StringBuilder();
        boolean nextIsFirstLetter = true;
        
        for (int i = 0; i < phrase.length(); i++) {
            char c = phrase.charAt(i);
            
            if (Character.isLetter(c)) {
                if (nextIsFirstLetter) {
                    abbreviation.append(Character.toUpperCase(c));
                    nextIsFirstLetter = false;
                }
            } else if (c != '\'') {
                nextIsFirstLetter = true;
            }
        }
        
        return abbreviation.toString();
    }
}