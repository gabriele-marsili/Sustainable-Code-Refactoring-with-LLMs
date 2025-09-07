import java.util.Random;
import java.util.Arrays;

class DnDCharacter {
    private static final Random rnd = new Random();

    private final int strength;
    private final int dexterity;
    private final int constitution;
    private final int intelligence;
    private final int wisdom;
    private final int charisma;
    private final int hitpoints;

    public DnDCharacter() {
        this.strength = ability();
        this.dexterity = ability();
        this.constitution = ability();
        this.intelligence = ability();
        this.wisdom = ability();
        this.charisma = ability();
        this.hitpoints = 10 + modifier(constitution);
    }


    private int ability() {
        int[] rolls = new int[4];
        for (int i = 0; i < 4; i++) {
            rolls[i] = rnd.nextInt(6) + 1;
        }
        Arrays.sort(rolls);
        return rolls[1] + rolls[2] + rolls[3];
    }

    int modifier(int input) {
        return (input - 10) / 2;
    }

    int getStrength() {
        return strength;
    }

    int getDexterity() {
        return dexterity;
    }

    int getConstitution() {
        return constitution;
    }

    int getIntelligence() {
        return intelligence;
    }

    int getWisdom() {
        return wisdom;
    }

    int getCharisma() {
        return charisma;
    }

    int getHitpoints() {
        return hitpoints;
    }

}