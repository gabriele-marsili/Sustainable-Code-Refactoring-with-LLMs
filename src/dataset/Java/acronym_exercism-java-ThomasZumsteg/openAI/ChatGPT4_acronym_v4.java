public class Acronym {
    public static String generate(String phrase) {
        StringBuilder acronym = new StringBuilder();
        for (String word : phrase.split("\\W+")) {
            acronym.append(Character.toUpperCase(word.charAt(0)));
            for (int i = 1; i < word.length(); i++) {
                char c = word.charAt(i);
                if (Character.isUpperCase(c)) {
                    acronym.append(c);
                }
            }
        }
        return acronym.toString();
    }
}