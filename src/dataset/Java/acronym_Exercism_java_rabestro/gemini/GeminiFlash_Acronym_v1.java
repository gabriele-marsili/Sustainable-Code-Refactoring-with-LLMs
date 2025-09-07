import java.util.function.Supplier;

record Acronym(String phrase) implements Supplier<String> {

    public String get() {
        StringBuilder acronym = new StringBuilder();
        boolean previousWasNotAlpha = true;
        for (int i = 0; i < phrase.length(); i++) {
            char c = phrase.charAt(i);
            if (Character.isLetter(c) && previousWasNotAlpha) {
                acronym.append(Character.toUpperCase(c));
                previousWasNotAlpha = false;
            } else if (!Character.isLetter(c) && c != '\'') {
                previousWasNotAlpha = true;
            } else if (c == '\'') {
                // Keep previous state
            } else {
                previousWasNotAlpha = false;
            }
        }
        return acronym.toString();
    }
}