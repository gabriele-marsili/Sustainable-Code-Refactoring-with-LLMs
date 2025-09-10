import java.util.Arrays;
import java.util.stream.Collectors;

class PigLatinTranslator {

  String translate(String phrase) {
    return Arrays.stream(phrase.split(" "))
        .map(this::translateWord)
        .collect(Collectors.joining(" "));
  }

  private String translateWord(String word) {
    int len = word.length();
    char firstChar = word.charAt(0);

    if (firstChar == 'y' && len > 1 && word.charAt(1) == 't') return word + "ay";
    if (firstChar == 'x' && len > 1 && word.charAt(1) == 'r') return word + "ay";
    if ("aeiou".indexOf(firstChar) != -1) {
      if (len > 1 && word.startsWith("qu", 1)) return word + "ay";
      return word + "ay";
    }

    if (len >= 3 && (word.startsWith("thr") || word.startsWith("sch"))) return word.substring(3) + word.substring(0, 3) + "ay";
    if (len >= 2 && (word.startsWith("ch") || word.startsWith("qu") || word.startsWith("th") || word.startsWith("rh"))) return word.substring(2) + word.substring(0, 2) + "ay";

    return word.substring(1) + firstChar + "ay";
  }
}