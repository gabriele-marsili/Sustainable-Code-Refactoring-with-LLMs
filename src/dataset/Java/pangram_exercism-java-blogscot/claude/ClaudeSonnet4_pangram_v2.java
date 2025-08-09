class PangramChecker {

  boolean isPangram(String input) {
    if (input.length() < 26) return false;
    
    boolean[] letters = new boolean[26];
    int count = 0;
    
    for (int i = 0; i < input.length(); i++) {
      char c = input.charAt(i);
      if (c >= 'A' && c <= 'Z') {
        int index = c - 'A';
        if (!letters[index]) {
          letters[index] = true;
          if (++count == 26) return true;
        }
      } else if (c >= 'a' && c <= 'z') {
        int index = c - 'a';
        if (!letters[index]) {
          letters[index] = true;
          if (++count == 26) return true;
        }
      }
    }
    
    return count == 26;
  }

}