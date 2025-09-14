public class FootballMatchReports {
    private static final String[] POSITIONS = {
        null,           // index 0 - unused
        "goalie",       // index 1
        "left back",    // index 2
        "center back",  // index 3
        "center back",  // index 4
        "right back",   // index 5
        "midfielder",   // index 6
        "midfielder",   // index 7
        "midfielder",   // index 8
        "left wing",    // index 9
        "striker",      // index 10
        "right wing"    // index 11
    };
    
    public static String onField(int shirtNum) {
        if (shirtNum < 1 || shirtNum > 11) {
            throw new IllegalArgumentException();
        }
        return POSITIONS[shirtNum];
    }
}