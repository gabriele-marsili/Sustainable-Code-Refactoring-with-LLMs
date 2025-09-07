import java.util.concurrent.ThreadLocalRandom;

public class DnDCharacter {

    private final int strength;
    private final int dexterity;
    private final int constitution;
    private final int intelligence;
    private final int wisdom;
    private final int charisma;
    private final int hitpoints;

    private static final int[] ABILITY_INDICES = {5, 2, 1, 3, 4, 0}; // charisma, constitution, dexterity, intelligence, wisdom, strength

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
        ThreadLocalRandom random = ThreadLocalRandom.current();
        int randomIndex = random.nextInt(6);
        
        switch (ABILITY_INDICES[randomIndex]) {
            case 0: return strength;
            case 1: return dexterity;
            case 2: return constitution;
            case 3: return intelligence;
            case 4: return wisdom;
            case 5: return charisma;
            default: return -1;
        }
    }

    int randomDieTotal() {
        ThreadLocalRandom random = ThreadLocalRandom.current();
        int min = 7;
        int sum = 0;
        
        for (int i = 0; i < 4; i++) {
            int roll = random.nextInt(1, 7);
            sum += roll;
            if (roll < min) {
                min = roll;
            }
        }
        
        return sum - min;
    }

    int modifier(double input) {
        return (int) Math.floor((input - 10.0) / 2.0);
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