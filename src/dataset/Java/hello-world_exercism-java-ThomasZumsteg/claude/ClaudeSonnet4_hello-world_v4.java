public class HelloWorld {
    private static final String DEFAULT_NAME = "World";
    private static final String HELLO_PREFIX = "Hello, ";
    private static final String HELLO_SUFFIX = "!";
    
    public static String hello(String name) {
        if (name == null || name.isEmpty()) {
            name = DEFAULT_NAME;
        }
        return HELLO_PREFIX + name + HELLO_SUFFIX;
    }
}