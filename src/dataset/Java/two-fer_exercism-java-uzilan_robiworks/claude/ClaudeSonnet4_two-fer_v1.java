public class Twofer {
    private static final String DEFAULT_MESSAGE = "One for you, one for me.";
    private static final String SUFFIX = ", one for me.";
    
    public String twofer(String name) {
        return name == null ? DEFAULT_MESSAGE : "One for " + name + SUFFIX;
    }
}