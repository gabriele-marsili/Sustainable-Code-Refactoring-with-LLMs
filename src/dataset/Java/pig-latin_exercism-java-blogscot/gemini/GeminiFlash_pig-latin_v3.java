import java.util.Arrays;

class PigLatinTranslator {

  String translate(String phrase) {
    return Arrays.stream(phrase.split(" "))
        .map(this::translateWord)
        .reduce((a, b) -> a + " " + b)
        .orElse("");
  }

  private String translateWord(String word) {
    int len = word.length();
    char firstChar = word.charAt(0);

    if (firstChar == 'y' && len > 1 && word.charAt(1) == 't') return word + "ay";
    if (firstChar == 'x' && len > 1 && word.charAt(1) == 'r') return word + "ay";

    if (isVowel(firstChar)) {
      if (firstChar == 'u' && len > 1 && word.charAt(1) == 'q') {
        return word + "ay";
      }
      return word + "ay";
    }

    if (len >= 3 && (word.startsWith("thr") || word.startsWith("sch"))) {
      return word.substring(3) + word.substring(0, 3) + "ay";
    }

    if (len >= 3 && word.substring(1, 3).equals("qu")) {
      return word.substring(3) + word.substring(0, 3) + "ay";
    }

    if (len >= 2 && (word.startsWith("ch") || word.startsWith("qu") || word.startsWith("th") || word.startsWith("rh"))) {
      return word.substring(2) + word.substring(0, 2) + "ay";
    }

    return word.substring(1) + firstChar + "ay";
  }

  private boolean isVowel(char c) {
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
  }
}