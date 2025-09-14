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
        do {
            char letter1 = (char)(random.nextInt(26) + 65);
            char letter2 = (char)(random.nextInt(26) + 65);
            int number = random.nextInt(1000);
            this.name = String.format("%c%c%03d", letter1, letter2, number);
        } while(namesInUse.contains(this.name));
        
        namesInUse.add(this.name);
        if (!oldName.isEmpty()) {
            namesInUse.remove(oldName);
        }
    }
}