class RaindropConverter {
  private static final int[] keys = {3, 5, 7};
  private static final String[] values = {"Pling", "Plang", "Plong"};

  String convert(int number) {
    StringBuilder result = new StringBuilder();

    // Loop unrolling for better performance on small, fixed-size arrays.
    // This reduces loop overhead.
    if (number % keys[0] == 0) {
      result.append(values[0]);
    }
    if (number % keys[1] == 0) {
      result.append(values[1]);
    }
    if (number % keys[2] == 0) {
      result.append(values[2]);
    }

    // Using an empty string check is slightly more efficient than checking length > 0
    // and then calling toString(), especially if the builder is frequently empty.
    // However, for this specific case, the difference is negligible.
    // The original logic is preserved without significant performance impact.
    if (result.length() == 0) {
      return Integer.toString(number);
    } else {
      return result.toString();
    }
  }
}