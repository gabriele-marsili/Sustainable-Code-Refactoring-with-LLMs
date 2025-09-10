public class HelloWorld {
    public static String hello(String name) {
        String effectiveName = (name == null || name.isEmpty()) ? "World" : name;
        return "Hello, " + effectiveName + "!";
    }
}