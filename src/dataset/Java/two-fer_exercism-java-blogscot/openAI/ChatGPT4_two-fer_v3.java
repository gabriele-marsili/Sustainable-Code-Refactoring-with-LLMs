class Twofer {

    private static final String DEFAULT_NAME = "you";
    private static final String TEMPLATE = "One for %s, one for me.";

    String twofer(String name) {
        return String.format(TEMPLATE, name == null ? DEFAULT_NAME : name);
    }
}