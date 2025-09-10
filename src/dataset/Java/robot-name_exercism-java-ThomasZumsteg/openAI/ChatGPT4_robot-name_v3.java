import java.util.concurrent.ThreadLocalRandom;
import java.util.Set;
import java.util.HashSet;

public class Robot {
    private String name = "";
    private static final Set<String> namesInUse = new HashSet<>();

    public Robot() {
        reset();
    }

    public String getName() {
        return this.name;
    }

    public void reset() {
        String oldName = this.name;
        do {
            this.name = generateName();
        } while (!namesInUse.add(this.name));
        if (!oldName.isEmpty()) {
            namesInUse.remove(oldName);
        }
    }

    private String generateName() {
        ThreadLocalRandom random = ThreadLocalRandom.current();
        char firstLetter = (char) (random.nextInt(26) + 'A');
        char secondLetter = (char) (random.nextInt(26) + 'A');
        int number = random.nextInt(1000);
        return String.format("%c%c%03d", firstLetter, secondLetter, number);
    }
}