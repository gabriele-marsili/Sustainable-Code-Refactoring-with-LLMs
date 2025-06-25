import java.util.Arrays;
import java.util.stream.Collectors;

class PigLatinTranslator {

  String translate(String phrase) {
    return Arrays
        .stream(phrase.split(" "))
        .map(this::translateWord)
        .collect(Collectors.joining(" "));
  }

  private String translateWord(String word) {

    if (word.matches("(yt|xr|[aeiou]|[aeiou]qu).*")) return word + "ay";
    else if (word.matches("(thr|sch|[^aeiou]qu).*")) return word.substring(3) + word.substring(0, 3) + "ay";
    else if (word.matches("(ch|qu|th|rh).*")) return word.substring(2) + word.substring(0, 2) + "ay";

    return word.substring(1) + word.charAt(0) + "ay";
  }

}
