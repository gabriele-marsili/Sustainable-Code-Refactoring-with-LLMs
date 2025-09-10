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
    if (word.startsWith("yt") || word.startsWith("xr") || isVowel(firstChar)) {
      return word + "ay";
    } else if (word.startsWith("thr") || word.startsWith("sch") || word.startsWith("qu") && !isVowel(firstChar)) {
      return word.substring(3) + word.substring(0, 3) + "ay";
    } else if (word.startsWith("ch") || word.startsWith("qu") || word.startsWith("th") || word.startsWith("rh")) {
      return word.substring(2) + word.substring(0, 2) + "ay";
    }
    return word.substring(1) + firstChar + "ay";
  }

  private boolean isVowel(char c) {
    return "aeiou".indexOf(c) != -1;
  }
}