class Twofer {
    private static final String TWOFER = "One for %s, one for me.";
    private static final String DEFAULT_NAME = "you";

    String twofer(String name) {
        String actualName = (name == null || name.isBlank()) ? DEFAULT_NAME : name;
        return String.format(TWOFER, actualName);
    }
}