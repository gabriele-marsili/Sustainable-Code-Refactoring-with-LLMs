class Twofer {
    private static final String TWOFER = "One for %s, one for me.";
    private static final String DEFAULT_NAME = "you";

    String twofer(String name) {
        return String.format(TWOFER, (name == null || name.isBlank()) ? DEFAULT_NAME : name);
    }
}