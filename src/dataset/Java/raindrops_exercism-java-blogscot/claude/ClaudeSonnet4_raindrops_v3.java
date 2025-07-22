class RaindropConverter {
  private static final int[] KEYS = {3, 5, 7};
  private static final String[] VALUES = {"Pling", "Plang", "Plong"};
  
  String convert(int number) {
    boolean hasDivisor = false;
    StringBuilder result = null;
    
    for (int i = 0; i < KEYS.length; i++) {
      if (number % KEYS[i] == 0) {
        if (!hasDivisor) {
          result = new StringBuilder(16);
          hasDivisor = true;
        }
        result.append(VALUES[i]);
      }
    }
    
    return hasDivisor ? result.toString() : Integer.toString(number);
  }
}