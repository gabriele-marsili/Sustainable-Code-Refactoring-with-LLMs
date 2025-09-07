class Twofer {
    private static final String PREFIX = "One for ";
    private static final String SUFFIX = ", one for me.";
    private static final String DEFAULT_NAME = "you";
    private static final String DEFAULT_RESULT = PREFIX + DEFAULT_NAME + SUFFIX;

    String twofer(String name) {
        if (name == null) {
            return DEFAULT_RESULT;
        }
        return PREFIX + name + SUFFIX;
    }
}