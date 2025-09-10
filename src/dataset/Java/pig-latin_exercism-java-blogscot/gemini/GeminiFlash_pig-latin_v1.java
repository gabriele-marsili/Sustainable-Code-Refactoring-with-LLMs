import java.util.Arrays;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

class PigLatinTranslator {

  private static final Pattern VOWEL_START = Pattern.compile("^(yt|xr|[aeiouAEIOU])");
  private static final Pattern VOWEL_QU_START = Pattern.compile("^[aeiouAEIOU]qu");
  private static final Pattern THREE_CONSONANT_START = Pattern.compile("^(thr|sch)");
  private static final Pattern CONSONANT_QU_START = Pattern.compile("^([^aeiouAEIOU]qu)");
  private static final Pattern TWO_CONSONANT_START = Pattern.compile("^(ch|qu|th|rh)");

  String translate(String phrase) {
    return Arrays.stream(phrase.split(" "))
        .map(this::translateWord)
        .collect(Collectors.joining(" "));
  }

  private String translateWord(String word) {
    if (VOWEL_START.matcher(word).find() || VOWEL_QU_START.matcher(word).find()) {
      return word + "ay";
    } else if (THREE_CONSONANT_START.matcher(word).find()) {
      return word.substring(3) + word.substring(0, 3) + "ay";
    } else if (CONSONANT_QU_START.matcher(word).find()) {
      return word.substring(3) + word.substring(0, 3) + "ay";
    } else if (TWO_CONSONANT_START.matcher(word).find()) {
      return word.substring(2) + word.substring(0, 2) + "ay";
    } else {
      return word.substring(1) + word.charAt(0) + "ay";
    }
  }
}