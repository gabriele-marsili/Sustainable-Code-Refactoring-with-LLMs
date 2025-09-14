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
    if (word.isEmpty()) return word;
    
    char first = word.charAt(0);
    char second = word.length() > 1 ? word.charAt(1) : '\0';
    char third = word.length() > 2 ? word.charAt(2) : '\0';
    
    if (isVowel(first) || (first == 'y' && second == 't') || (first == 'x' && second == 'r')) {
      return word + "ay";
    }
    
    if (first == 't' && second == 'h' && third == 'r') {
      return word.substring(3) + word.substring(0, 3) + "ay";
    }
    
    if (first == 's' && second == 'c' && third == 'h') {
      return word.substring(3) + word.substring(0, 3) + "ay";
    }
    
    if ((first == 'c' && second == 'h') || 
        (first == 'q' && second == 'u') || 
        (first == 't' && second == 'h') || 
        (first == 'r' && second == 'h')) {
      return word.substring(2) + word.substring(0, 2) + "ay";
    }
    
    if (!isVowel(first) && second == 'q' && third == 'u') {
      return word.substring(3) + word.substring(0, 3) + "ay";
    }
    
    return word.substring(1) + first + "ay";
  }
  
  private boolean isVowel(char c) {
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
  }
}