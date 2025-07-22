class RaindropConverter {
  private static final int[] KEYS = {3, 5, 7};
  private static final String[] VALUES = {"Pling", "Plang", "Plong"};

  String convert(int number) {
    int length = 0;
    char[] buffer = new char[15];
    for (int i = 0; i < KEYS.length; i++) {
      if (number % KEYS[i] == 0) {
        String val = VALUES[i];
        for (int j = 0; j < val.length(); j++) {
          buffer[length++] = val.charAt(j);
        }
      }
    }
    if (length == 0) {
      return Integer.toString(number);
    }
    return new String(buffer, 0, length);
  }
}
