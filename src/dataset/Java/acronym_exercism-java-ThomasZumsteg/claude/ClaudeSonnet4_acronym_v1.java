public class Acronym {
    //Acronym shortens words to indecipherable shorter versions
    public static String generate(String phrase) {
        //generate creates an acronym from a word base on capitilization
        String[] words = phrase.split("\\W+");
        StringBuilder acronym = new StringBuilder();
        
        for(String word : words) {
            if (word.isEmpty()) continue;
            
            acronym.append(Character.toUpperCase(word.charAt(0)));
            
            for(int i = 1; i < word.length(); i++) {
                char c = word.charAt(i);
                if(Character.isUpperCase(c)) {
                    acronym.append(c);
                }
            }
        }
        return acronym.toString();
    }
}