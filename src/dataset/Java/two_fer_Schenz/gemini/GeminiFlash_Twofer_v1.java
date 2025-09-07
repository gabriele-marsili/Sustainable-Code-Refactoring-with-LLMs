class Twofer {
    private static final String TWOFER_DEFAULT = "One for you, one for me.";
    private static final String TWOFER_NAMED = "One for %s, one for me.";

    String twofer(String name) {
        if (name == null || name.trim().isEmpty()) {
            return TWOFER_DEFAULT;
        }

        return String.format(TWOFER_NAMED, name);
    }
}