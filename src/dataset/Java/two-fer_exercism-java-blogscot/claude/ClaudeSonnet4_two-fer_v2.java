class Twofer {
    private static final String PREFIX = "One for ";
    private static final String SUFFIX = ", one for me.";
    private static final String DEFAULT_NAME = "you";

    String twofer(String name) {
        String targetName = (name == null) ? DEFAULT_NAME : name;
        return PREFIX + targetName + SUFFIX;
    }
}