class Twofer {
    private static final String TWOFER_DEFAULT = "One for you, one for me.";
    private static final String TWOFER_PREFIX = "One for ";
    private static final String TWOFER_SUFFIX = ", one for me.";

    String twofer(String name) {
        if (name == null || name.isEmpty() || name.trim().isEmpty()) {
            return TWOFER_DEFAULT;
        }
        
        return TWOFER_PREFIX + name + TWOFER_SUFFIX;
    }
}