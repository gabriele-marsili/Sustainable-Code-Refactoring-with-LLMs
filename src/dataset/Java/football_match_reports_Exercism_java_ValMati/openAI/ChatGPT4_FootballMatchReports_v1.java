import java.util.Map;

public class FootballMatchReports {
    private static final Map<Integer, String> SHIRT_POSITIONS = Map.of(
        1, "goalie",
        2, "left back",
        3, "center back",
        4, "center back",
        5, "right back",
        6, "midfielder",
        7, "midfielder",
        8, "midfielder",
        9, "left wing",
        10, "striker",
        11, "right wing"
    );

    public static String onField(int shirtNum) {
        String position = SHIRT_POSITIONS.get(shirtNum);
        if (position == null) {
            throw new IllegalArgumentException();
        }
        return position;
    }
}