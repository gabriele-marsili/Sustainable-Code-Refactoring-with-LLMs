public class PigLatin {

    private static final String VOWELS = "aeiou";

    public static String translate(String input) {
        String[] words = input.split(" ");
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < words.length; i++) {
            result.append(translateWord(words[i]));
            if (i < words.length - 1) {
                result.append(" ");
            }
        }
        return result.toString();
    }

    private static String translateWord(String word) {
        int firstVowelIndex = -1;
        for (int i = 0; i < word.length(); i++) {
            if (VOWELS.indexOf(word.charAt(i)) != -1) {
                firstVowelIndex = i;
                break;
            }
        }

        if (firstVowelIndex == -1) {
            return word + "ay";
        }

        if (word.startsWith("qu")) {
            return word.substring(2) + "quay";
        }

        if (firstVowelIndex > 0 && word.substring(firstVowelIndex - 1, firstVowelIndex + 1).equals("qu")) {
            return word.substring(firstVowelIndex + 1) + word.substring(0, firstVowelIndex + 1) + "ay";
        }

        if (word.startsWith("y") && !VOWELS.contains(String.valueOf(word.charAt(1)))) {
            return word + "ay";
        }

        if (firstVowelIndex == 0) {
            return word + "ay";
        } else {
            return word.substring(firstVowelIndex) + word.substring(0, firstVowelIndex) + "ay";
        }
    }
}