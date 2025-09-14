import java.util.Random;
import java.util.Set;
import java.util.HashSet;

public class Robot {
    private String name = "";
    private static final Set<String> namesInUse = new HashSet<String>();
    private static final Random random = new Random();
    private static final StringBuilder nameBuilder = new StringBuilder(5);

    public Robot() {
        reset();
    }

    public String getName() {
        return this.name;
    }

    public void reset() {
        String oldName = this.name;
        do {
            nameBuilder.setLength(0);
            nameBuilder.append((char)(random.nextInt(26) + 65));
            nameBuilder.append((char)(random.nextInt(26) + 65));
            nameBuilder.append(random.nextInt(1000));
            this.name = nameBuilder.toString();
        } while(namesInUse.contains(this.name));
        
        namesInUse.add(this.name);
        if (!oldName.isEmpty()) {
            namesInUse.remove(oldName);
        }
    }
}