class PangramChecker {

  boolean isPangram(String input) {
    if (input == null || input.length() < 26) return false;
    boolean[] seen = new boolean[26];
    int count = 0;
    for (int i = 0, len = input.length(); i < len; i++) {
      char c = input.charAt(i);
      if (c >= 'A' && c <= 'Z') c += 32;
      if (c >= 'a' && c <= 'z') {
        int idx = c - 'a';
        if (!seen[idx]) {
          seen[idx] = true;
          if (++count == 26) return true;
        }
      }
    }
    return false;
  }

}