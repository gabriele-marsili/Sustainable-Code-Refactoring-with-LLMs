import java.util.BitSet;

class PangramChecker {

  boolean isPangram(String input) {
    if (input.length() < 26) return false;
    
    BitSet letters = new BitSet(26);
    int count = 0;
    
    for (int i = 0; i < input.length() && count < 26; i++) {
      char c = input.charAt(i);
      if (c >= 'A' && c <= 'Z') {
        int index = c - 'A';
        if (!letters.get(index)) {
          letters.set(index);
          count++;
        }
      } else if (c >= 'a' && c <= 'z') {
        int index = c - 'a';
        if (!letters.get(index)) {
          letters.set(index);
          count++;
        }
      }
    }
    
    return count == 26;
  }

}