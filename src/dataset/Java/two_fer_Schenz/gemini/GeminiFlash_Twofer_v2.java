class Twofer {
    private static final String TWOFER_DEFAULT = "One for you, one for me.";

    String twofer(String name) {
        if (name == null || name.trim().isEmpty()) {
            return TWOFER_DEFAULT;
        }

        return "One for " + name + ", one for me.";
    }
}