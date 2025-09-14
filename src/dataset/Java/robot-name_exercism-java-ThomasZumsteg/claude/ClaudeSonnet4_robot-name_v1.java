import java.util.Random;
import java.util.Set;
import java.util.HashSet;

public class Robot {
    private String name = "";
    private static Set<String> namesInUse = new HashSet<String>();
    private static Random random = new Random();

    public Robot() {
        reset();
    }

    public String getName() {
        return this.name;
    }

    public void reset() {
        String oldName = this.name;
        StringBuilder nameBuilder = new StringBuilder(5);
        
        do {
            nameBuilder.setLength(0);
            nameBuilder.append((char)(random.nextInt(26) + 65));
            nameBuilder.append((char)(random.nextInt(26) + 65));
            int number = random.nextInt(1000);
            if (number < 10) {
                nameBuilder.append("00").append(number);
            } else if (number < 100) {
                nameBuilder.append("0").append(number);
            } else {
                nameBuilder.append(number);
            }
            this.name = nameBuilder.toString();
        } while (namesInUse.contains(this.name));
        
        namesInUse.add(this.name);
        if (!oldName.isEmpty()) {
            namesInUse.remove(oldName);
        }
    }
}