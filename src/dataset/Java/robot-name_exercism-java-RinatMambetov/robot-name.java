import java.util.HashSet;
import java.util.Random;
import java.util.Set;

class Robot {
    private String name = "";
    private static final Set<String> names = new HashSet<>();

    private int getRandomNumber(int min, int max) {
        Random random = new Random();
        return random.nextInt(max - min + 1) + min;
    }

    private void makeName() {
        char firstChar = (char) getRandomNumber(65, 90);
        char secondChar = (char) getRandomNumber(65, 90);
        int firstNum = getRandomNumber(0, 9);
        int secondNum = getRandomNumber(0, 9);
        int thirdNum = getRandomNumber(0, 9);
        var name = new StringBuilder();
        name.append(firstChar).append(secondChar).append(firstNum).append(secondNum).append(thirdNum);
        if (names.contains(name.toString())) {
            makeName();
        } else {
            this.name = name.toString();
            names.add(name.toString());
        }
    }

    String getName() {
        if (name.isEmpty()) {
            makeName();
        }
        return name;
    }

    void reset() {
        name = "";
    }

}