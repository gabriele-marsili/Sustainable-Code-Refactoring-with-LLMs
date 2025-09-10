public class HelloWorld {
    public static String hello(String name) {
        String validName = (name == null || name.isEmpty()) ? "World" : name;
        return "Hello, " + validName + "!";
    }
}