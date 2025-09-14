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
    
    // Check for vowel sounds at start
    if (isVowel(first) || (first == 'y' && second == 't') || (first == 'x' && second == 'r')) {
      return word + "ay";
    }
    
    // Check for 3-consonant clusters
    if ((first == 't' && second == 'h' && third == 'r') ||
        (first == 's' && second == 'c' && third == 'h') ||
        (first != 'a' && first != 'e' && first != 'i' && first != 'o' && first != 'u' && 
         second == 'q' && third == 'u')) {
      return word.substring(3) + word.substring(0, 3) + "ay";
    }
    
    // Check for 2-consonant clusters
    if ((first == 'c' && second == 'h') ||
        (first == 'q' && second == 'u') ||
        (first == 't' && second == 'h') ||
        (first == 'r' && second == 'h')) {
      return word.substring(2) + word.substring(0, 2) + "ay";
    }
    
    // Single consonant
    return word.substring(1) + first + "ay";
  }
  
  private boolean isVowel(char c) {
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
  }
}