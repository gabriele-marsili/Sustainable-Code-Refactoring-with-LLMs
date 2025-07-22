class RaindropConverter {
  String convert(int number) {
    boolean hasSound = false;
    StringBuilder result = new StringBuilder(15);

    if (number % 3 == 0) {
      result.append("Pling");
      hasSound = true;
    }
    if (number % 5 == 0) {
      result.append("Plang");
      hasSound = true;
    }
    if (number % 7 == 0) {
      result.append("Plong");
      hasSound = true;
    }

    return hasSound ? result.toString() : Integer.toString(number);
  }
}