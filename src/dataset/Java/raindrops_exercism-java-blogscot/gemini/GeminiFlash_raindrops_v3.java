class RaindropConverter {
  private static final int[] keys = {3, 5, 7};
  private static final String[] values = {"Pling", "Plang", "Plong"};
  String convert(int number) {
    StringBuilder result = new StringBuilder();
    // Using a simple loop is efficient enough for a small, fixed number of iterations (keys.length).
    // Avoiding Stream API here to minimize potential overheads in object creation and
    // method call stacks, which can contribute to higher CPU and memory usage for
    // this specific, small-scale operation.
    for (int i = 0; i < keys.length; i++) {
      if (number % keys[i] == 0) {
        result.append(values[i]);
      }
    }
    // Directly check length and return toString() or Integer.toString() to avoid
    // an unnecessary intermediate String object creation if result is empty.
    return result.length() > 0 ? result.toString() : Integer.toString(number);
  }
}