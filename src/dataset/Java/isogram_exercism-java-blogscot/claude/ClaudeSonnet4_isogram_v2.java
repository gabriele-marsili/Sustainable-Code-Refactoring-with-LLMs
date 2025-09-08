class IsogramChecker {

  boolean isIsogram(String phrase) {
    var seen = new boolean[26];
    
    for (int i = 0; i < phrase.length(); i++) {
      char c = phrase.charAt(i);
      if (Character.isLetter(c)) {
        int index = Character.toLowerCase(c) - 'a';
        if (seen[index]) {
          return false;
        }
        seen[index] = true;
      }
    }
    
    return true;
  }

}