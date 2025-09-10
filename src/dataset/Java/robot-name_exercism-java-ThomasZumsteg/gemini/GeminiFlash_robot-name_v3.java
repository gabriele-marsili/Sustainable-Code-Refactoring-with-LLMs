import java.util.Random;
import java.util.Set;
import java.util.HashSet;

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
        String newName;
        do {
            newName = generateName();
        } while (namesInUse.contains(newName));

        String oldName = this.name;
        this.name = newName;

        namesInUse.add(this.name);
        if (oldName != null && !oldName.isEmpty()) {
            namesInUse.remove(oldName);
        }
    }

    private static String generateName() {
        StringBuilder sb = new StringBuilder();
        sb.append((char)(random.nextInt(26) + 65));
        sb.append((char)(random.nextInt(26) + 65));
        sb.append(String.format("%03d", random.nextInt(1000)));
        return sb.toString();
    }
}