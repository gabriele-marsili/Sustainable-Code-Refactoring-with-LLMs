import java.util.function.Supplier;

record Acronym(String phrase) implements Supplier<String> {

    public String get() {
        StringBuilder acronym = new StringBuilder();
        boolean previousWasNotLetterOrApostrophe = true;
        for (int i = 0; i < phrase.length(); i++) {
            char c = phrase.charAt(i);
            if (Character.isLetter(c) && previousWasNotLetterOrApostrophe) {
                acronym.append(Character.toUpperCase(c));
                previousWasNotLetterOrApostrophe = false;
            } else if (!Character.isLetter(c) && c != '\'') {
                previousWasNotLetterOrApostrophe = true;
            } else if (c == '\'') {
                previousWasNotLetterOrApostrophe = false;
            }
        }
        return acronym.toString();
    }
}