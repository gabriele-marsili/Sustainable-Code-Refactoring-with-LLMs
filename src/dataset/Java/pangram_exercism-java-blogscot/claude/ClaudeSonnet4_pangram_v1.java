class PangramChecker {

  boolean isPangram(String input) {
    if (input == null || input.length() < 26) {
      return false;
    }
    
    boolean[] letters = new boolean[26];
    int foundCount = 0;
    
    for (int i = 0; i < input.length() && foundCount < 26; i++) {
      char c = input.charAt(i);
      if (c >= 'A' && c <= 'Z') {
        int index = c - 'A';
        if (!letters[index]) {
          letters[index] = true;
          foundCount++;
        }
      } else if (c >= 'a' && c <= 'z') {
        int index = c - 'a';
        if (!letters[index]) {
          letters[index] = true;
          foundCount++;
        }
      }
    }
    
    return foundCount == 26;
  }

}