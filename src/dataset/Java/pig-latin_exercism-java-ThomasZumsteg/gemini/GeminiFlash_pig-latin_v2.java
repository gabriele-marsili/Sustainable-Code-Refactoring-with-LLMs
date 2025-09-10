public class PigLatin {
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

    private static String translateWord(String input) {
        int firstVowelIndex = -1;
        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            if (isVowel(c)) {
                firstVowelIndex = i;
                break;
            }
        }

        if (firstVowelIndex == -1) {
            return input + "ay";
        }

        if (input.startsWith("qu")) {
            return input.substring(2) + "quay";
        }

        if (firstVowelIndex == 0) {
            return input + "ay";
        }

        if (input.startsWith("y") && !isVowel(input.charAt(1))) {
            return input + "ay";
        }

        for (int i = 0; i < input.length() - 1; i++) {
            if (input.substring(i, i + 2).equals("qu")) {
                return input.substring(i + 2) + input.substring(0, i + 2) + "ay";
            }
        }

        return input.substring(firstVowelIndex) + input.substring(0, firstVowelIndex) + "ay";
    }

    private static boolean isVowel(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
}