class Twofer {

    String twofer(String name) {
        String actualName = (name == null || name.isEmpty()) ? "you" : name;
        return new StringBuilder("One for ").append(actualName).append(", one for me.").toString();
    }
}