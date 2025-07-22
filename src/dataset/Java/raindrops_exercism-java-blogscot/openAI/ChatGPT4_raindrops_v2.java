class RaindropConverter {
  private static final int[] keys = {3, 5, 7};
  private static final String[] values = {"Pling", "Plang", "Plong"};

  String convert(int number) {
    for (int i = 0; i < keys.length; i++) {
      if (number % keys[i] == 0) {
        StringBuilder result = new StringBuilder(values[i]);
        for (int j = i + 1; j < keys.length; j++) {
          if (number % keys[j] == 0) {
            result.append(values[j]);
          }
        }
        return result.toString();
      }
    }
    return Integer.toString(number);
  }
}
