public class FootballMatchReports {

    private static final String[] POSITIONS = new String[12];

    static {
        POSITIONS[1] = "goalie";
        POSITIONS[2] = "left back";
        POSITIONS[3] = "center back";
        POSITIONS[4] = "center back";
        POSITIONS[5] = "right back";
        POSITIONS[6] = "midfielder";
        POSITIONS[7] = "midfielder";
        POSITIONS[8] = "midfielder";
        POSITIONS[9] = "left wing";
        POSITIONS[10] = "striker";
        POSITIONS[11] = "right wing";
    }

    public static String onField(int shirtNum) {
        if (shirtNum > 0 && shirtNum < POSITIONS.length) {
            String position = POSITIONS[shirtNum];
            if (position != null) {
                return position;
            }
        }
        throw new IllegalArgumentException();
    }
}