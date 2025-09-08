import java.util.HashSet;

class IsogramChecker {

  boolean isIsogram(String phrase) {
    var seen = new HashSet<Character>();
    
    for (int i = 0; i < phrase.length(); i++) {
      char c = phrase.charAt(i);
      if (Character.isLetter(c)) {
        char lower = Character.toLowerCase(c);
        if (!seen.add(lower)) {
          return false;
        }
      }
    }
    
    return true;
  }

}