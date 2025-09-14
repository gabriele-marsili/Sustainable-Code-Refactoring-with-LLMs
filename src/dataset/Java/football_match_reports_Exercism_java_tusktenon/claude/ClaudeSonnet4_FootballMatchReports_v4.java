public class FootballMatchReports {
  private static final String[] POSITIONS = {
    null,
    "goalie",
    "left back",
    "center back",
    "center back",
    "right back",
    "midfielder",
    "midfielder",
    "midfielder",
    "left wing",
    "striker",
    "right wing"
  };

  public static String onField(int shirtNum) {
    if (shirtNum < 1 || shirtNum > 11) {
      throw new IllegalArgumentException(
          "Shirt number should be between 1 and 11, got " + shirtNum);
    }
    return POSITIONS[shirtNum];
  }
}