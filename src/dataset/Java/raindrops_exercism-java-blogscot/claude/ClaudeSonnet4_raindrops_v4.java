
class RaindropConverter {
  private static final String PLING = "Pling";
  private static final String PLANG = "Plang";
  private static final String PLONG = "Plong";

  String convert(int number) {
    if (number % 105 == 0) return "PlingPlangPlong";
    if (number % 21 == 0) return "PlingPlong";
    if (number % 15 == 0) return "PlingPlang";
    if (number % 35 == 0) return "PlangPlong";
    if (number % 3 == 0) return PLING;
    if (number % 5 == 0) return PLANG;
    if (number % 7 == 0) return PLONG;
    return Integer.toString(number);
  }
}