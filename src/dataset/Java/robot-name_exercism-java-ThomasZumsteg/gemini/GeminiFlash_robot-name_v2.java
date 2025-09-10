import java.util.HashSet;
import java.util.Random;
import java.util.Set;

public class Robot {
    private String name = "";
    private static final Set<String> namesInUse = new HashSet<>();
    private static final Random random = new Random();

    public Robot() {
        reset();
    }

    public String getName() {
        return this.name;
    }

    public void reset() {
        String oldName = this.name;
        String newName;
        do {
            newName = generateName();
        } while (namesInUse.contains(newName));

        this.name = newName;
        namesInUse.add(this.name);
        if (oldName != null && !oldName.isEmpty()) {
            namesInUse.remove(oldName);
        }
    }

    private static String generateName() {
        StringBuilder sb = new StringBuilder();
        sb.append((char) (random.nextInt(26) + 'A'));
        sb.append((char) (random.nextInt(26) + 'A'));
        sb.append(String.format("%03d", random.nextInt(1000)));
        return sb.toString();
    }
}