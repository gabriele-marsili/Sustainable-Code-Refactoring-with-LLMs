import java.util.function.Supplier;

record Acronym(String phrase) implements Supplier<String> {

    public String get() {
        if (phrase == null || phrase.isEmpty()) {
            return "";
        }
        
        StringBuilder result = new StringBuilder();
        boolean takeNext = true;
        
        for (int i = 0; i < phrase.length(); i++) {
            char c = phrase.charAt(i);
            
            if (Character.isLetter(c)) {
                if (takeNext) {
                    result.append(Character.toUpperCase(c));
                    takeNext = false;
                }
            } else if (c != '\'') {
                takeNext = true;
            }
        }
        
        return result.toString();
    }
}