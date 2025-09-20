import java.util.StringJoiner;

class PigLatinTranslator {

  String translate(String phrase) {
    String[] words = phrase.split(" ");
    StringJoiner result = new StringJoiner(" ");
    for (String word : words) {
      result.add(translateWord(word));
    }
    return result.toString();
  }

  private String translateWord(String word) {
    char firstChar = word.charAt(0);
    if (startsWith(word, "yt", "xr") || isVowel(firstChar)) return word + "ay";
    if (startsWith(word, "thr", "sch") || word.startsWith("qu") && !isVowel(firstChar)) return word.substring(3) + word.substring(0, 3) + "ay";
    if (startsWith(word, "ch", "qu", "th", "rh")) return word.substring(2) + word.substring(0, 2) + "ay";
    return word.substring(1) + firstChar + "ay";
  }

  private boolean startsWith(String word, String... prefixes) {
    for (String prefix : prefixes) {
      if (word.startsWith(prefix)) return true;
    }
    return false;
  }

  private boolean isVowel(char c) {
    return "aeiou".indexOf(c) != -1;
  }
}