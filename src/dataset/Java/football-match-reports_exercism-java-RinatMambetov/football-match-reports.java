public class FootballMatchReports {
    public static String onField(int shirtNum) {
        String result;
        switch (shirtNum) {
            case 1 -> result = "goalie";
            case 2 -> result = "left back";
            case 3, 4 -> result = "center back";
            case 5 -> result = "right back";
            case 6, 7, 8 -> result = "midfielder";
            case 9 -> result = "left wing";
            case 10 -> result = "striker";
            case 11 -> result = "right wing";
            default -> throw new IllegalArgumentException();
        }
        return result;
    }
}
