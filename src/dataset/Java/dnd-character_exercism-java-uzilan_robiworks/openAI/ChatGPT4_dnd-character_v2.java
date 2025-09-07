import java.util.*;

class DnDCharacter {
    private static final Random rnd = new Random();

    private final int strength = ability();
    private final int dexterity = ability();
    private final int constitution = ability();
    private final int intelligence = ability();
    private final int wisdom = ability();
    private final int charisma = ability();
    private final int hitpoints = 10 + modifier(constitution);

    private int ability() {
        int[] rolls = new int[4];
        for (int i = 0; i < 4; i++) {
            rolls[i] = rnd.nextInt(6) + 1;
        }
        Arrays.sort(rolls);
        return rolls[1] + rolls[2] + rolls[3]; // Sum top 3 rolls
    }

    private int modifier(int input) {
        return (input - 10) / 2;
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