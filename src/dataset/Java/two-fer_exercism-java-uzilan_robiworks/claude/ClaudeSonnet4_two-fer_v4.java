public class Twofer {
    private static final String DEFAULT_MESSAGE = "One for you, one for me.";
    private static final String MESSAGE_PREFIX = "One for ";
    private static final String MESSAGE_SUFFIX = ", one for me.";
    
    public String twofer(String name) {
        return name == null ? DEFAULT_MESSAGE : MESSAGE_PREFIX + name + MESSAGE_SUFFIX;
    }
}