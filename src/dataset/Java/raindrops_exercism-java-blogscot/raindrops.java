class RaindropConverter {
  private static final int[] keys = {3, 5, 7};
  private static final String[] values = {"Pling", "Plang", "Plong"};

  String convert(int number) {
    StringBuilder result = new StringBuilder();

    for (int i = 0; i < keys.length; i++) {
      if (number % keys[i] == 0) {
        result.append(values[i]);
      }
    }

    return result.length() > 0 ? result.toString() : Integer.toString(number);
  }
}
