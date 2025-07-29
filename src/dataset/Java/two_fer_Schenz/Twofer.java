class Twofer {
    private static final String TWOFER = "One for %s, one for me.";
    private static final String DEFAULT_NAME = "you";

    String twofer(String name) {
        if (name == null || name.trim().isEmpty()) {
            name = DEFAULT_NAME;
        }

        return String.format(TWOFER, name);
    }
}
