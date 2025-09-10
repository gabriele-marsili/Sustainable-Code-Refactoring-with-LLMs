public class FootballMatchReports {
  private static final String[] positions = new String[12];

  static {
    positions[1] = "goalie";
    positions[2] = "left back";
    positions[3] = "center back";
    positions[4] = "center back";
    positions[5] = "right back";
    positions[6] = "midfielder";
    positions[7] = "midfielder";
    positions[8] = "midfielder";
    positions[9] = "left wing";
    positions[10] = "striker";
    positions[11] = "right wing";
  }

  public static String onField(int shirtNum) {
    if (shirtNum > 0 && shirtNum < 12) {
      return positions[shirtNum];
    } else {
      throw new IllegalArgumentException(
          "Shirt number should be between 1 and 11, got " + shirtNum);
    }
  }
}