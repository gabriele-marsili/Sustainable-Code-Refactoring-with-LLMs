import java.util.HashSet;

class IsogramChecker {

  boolean isIsogram(String phrase) {
    HashSet<Character> seen = new HashSet<>();
    for (int i = 0; i < phrase.length(); i++) {
      char c = Character.toLowerCase(phrase.charAt(i));
      if (Character.isLetter(c)) {
        if (seen.contains(c)) {
          return false;
        }
        seen.add(c);
      }
    }
    return true;
  }
}