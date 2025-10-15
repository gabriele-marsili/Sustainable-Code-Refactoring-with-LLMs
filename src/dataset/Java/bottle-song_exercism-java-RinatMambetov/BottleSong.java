class BottleSong {
    private final String[] numbers =
            {"no", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"};
    private String start = "%s green bottle%s hanging on the wall,\n";
    private String action = "And if one green bottle should accidentally fall,\n";
    private String finish = "There'll be %s green bottle%s hanging on the wall.\n";

    String getOneBottle(int bottleNum) {
        String startS = bottleNum == 1 ? "" : "s";
        String finishS = bottleNum == 2 ? "" : "s";
        return String.format(start, numbers[bottleNum], startS) +
                String.format(start, numbers[bottleNum], startS) +
                action +
                String.format(finish, numbers[bottleNum - 1].toLowerCase(), finishS);
    }

    String recite(int startBottles, int takeDown) {
        StringBuilder result = new StringBuilder();
        for (int bottleNum = startBottles; bottleNum > startBottles - takeDown; bottleNum--) {
            result.append(getOneBottle(bottleNum)).append("\n");
        }
        result.deleteCharAt(result.length() - 1);
        return result.toString();
    }

}