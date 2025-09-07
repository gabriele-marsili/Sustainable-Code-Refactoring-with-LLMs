import java.util.concurrent.ThreadLocalRandom;

public class DnDCharacter {

    private int strength;
    private int dexterity;
    private int constitution;
    private int intelligence;
    private int wisdom;
    private int charisma;
    private int hitpoints;

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
        switch (random) {
            case 1: return charisma;
            case 2: return constitution;
            case 3: return dexterity;
            case 4: return intelligence;
            case 5: return wisdom;
            case 6: return strength;
        }
        return -1;
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