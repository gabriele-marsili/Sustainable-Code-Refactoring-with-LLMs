public class Acronym {
    public static String generate(String phrase) {
        if (phrase == null || phrase.isEmpty()) {
            return "";
        }
        
        StringBuilder acronym = new StringBuilder();
        boolean isWordStart = true;
        
        for (int i = 0; i < phrase.length(); i++) {
            char c = phrase.charAt(i);
            
            if (Character.isLetter(c)) {
                if (isWordStart) {
                    acronym.append(Character.toUpperCase(c));
                    isWordStart = false;
                } else if (Character.isUpperCase(c)) {
                    acronym.append(c);
                }
            } else {
                isWordStart = true;
            }
        }
        
        return acronym.toString();
    }
}