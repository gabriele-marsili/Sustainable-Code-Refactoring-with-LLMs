public class Twofer {
    private static final String DEFAULT_NAME = "you";
    private static final String FIRST_PART = "One for ";
    private static final String SECOND_PART = ", one for me.";

    public String twofer(String name) {
        String actualName = (name == null || name.isEmpty()) ? DEFAULT_NAME : name;
        return FIRST_PART + actualName + SECOND_PART;
    }
}