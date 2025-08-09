import java.util.BitSet;

class PangramChecker {

  boolean isPangram(String input) {
    if (input == null || input.length() < 26) {
      return false;
    }
    
    BitSet letters = new BitSet(26);
    int foundCount = 0;
    
    for (int i = 0; i < input.length() && foundCount < 26; i++) {
      char c = input.charAt(i);
      if (c >= 'A' && c <= 'Z') {
        int index = c - 'A';
        if (!letters.get(index)) {
          letters.set(index);
          foundCount++;
        }
      } else if (c >= 'a' && c <= 'z') {
        int index = c - 'a';
        if (!letters.get(index)) {
          letters.set(index);
          foundCount++;
        }
      }
    }
    
    return foundCount == 26;
  }

}