import java.util.HashSet;

class IsogramChecker {

  boolean isIsogram(String phrase) {
    HashSet<Character> seen = new HashSet<>();
    for (char c : phrase.toLowerCase().toCharArray()) {
      if (Character.isLetter(c)) {
        if (!seen.add(c)) {
          return false;
        }
      }
    }
    return true;
  }

}