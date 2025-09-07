import java.util.Arrays;
import java.util.Random;

public class DnDCharacter {

    private int strength;
    private int dexterity;
    private int constitution;
    private int intelligence;
    private int wisdom;
    private int charisma;
    private int hitpoints;

    private static final Random random = new Random();


    public DnDCharacter() {
        this.strength = randomDieTotal();
        this.dexterity = randomDieTotal();
        this.constitution = randomDieTotal();
        this.wisdom = randomDieTotal();
        this.intelligence = randomDieTotal();
        this.charisma = randomDieTotal();
        this.hitpoints = 10 + modifier(constitution);
    }

    int ability() {
        return switch (random.nextInt(6)) {
            case 0 -> getCharisma();
            case 1 -> getConstitution();
            case 2 -> getDexterity();
            case 3 -> getIntelligence();
            case 4 -> getWisdom();
            case 5 -> getStrength();
            default -> -1; // Should never happen, but good to have a default
        };
    }

    int randomDieTotal() {
        int[] numbers = new int[4];

        for (int i = 0; i < 4; i++) {
            numbers[i] = random.nextInt(6) + 1;
        }

        Arrays.sort(numbers);
        return numbers[1] + numbers[2] + numbers[3];
    }

    int modifier(int input) {
        double hpModifier = (input - 10) / 2.0;
        return (int) Math.floor(hpModifier);
    }

    public int getStrength() {
        return strength;
    }

    public int getDexterity() {
        return dexterity;
    }

    public int getConstitution() {
        return constitution;
    }

    public int getIntelligence() {
        return intelligence;
    }

    public int getWisdom() {
        return wisdom;
    }

    public int getCharisma() {
        return charisma;
    }

    public int getHitpoints() {
        return hitpoints;
    }
}