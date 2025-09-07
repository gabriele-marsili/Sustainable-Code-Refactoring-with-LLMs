import java.util.concurrent.ThreadLocalRandom;

public class DnDCharacter {

    private final int strength;
    private final int dexterity;
    private final int constitution;
    private final int intelligence;
    private final int wisdom;
    private final int charisma;
    private final int hitpoints;

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
        int random = ThreadLocalRandom.current().nextInt(1, 7);
        return switch (random) {
            case 1 -> charisma;
            case 2 -> constitution;
            case 3 -> dexterity;
            case 4 -> intelligence;
            case 5 -> wisdom;
            case 6 -> strength;
            default -> -1; // This will never be reached
        };
    }

    int randomDieTotal() {
        int[] rolls = ThreadLocalRandom.current().ints(4, 1, 7).toArray();
        int min = Integer.MAX_VALUE, sum = 0;
        for (int roll : rolls) {
            sum += roll;
            if (roll < min) min = roll;
        }
        return sum - min;
    }

    int modifier(double input) {
        return (int) Math.floor((input - 10) / 2);
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