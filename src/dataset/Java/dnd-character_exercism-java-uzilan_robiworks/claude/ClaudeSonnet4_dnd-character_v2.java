import java.util.*;

class DnDCharacter {
    private static final Random rnd = new Random();

    public final int strength = ability();
    public final int dexterity = ability();
    public final int constitution = ability();
    public final int intelligence = ability();
    public final int wisdom = ability();
    public final int charisma = ability();
    public final int hitpoints = 10 + modifier(constitution);

    private static int ability() {
        int[] rolls = new int[4];
        for (int i = 0; i < 4; i++) {
            rolls[i] = rnd.nextInt(6) + 1;
        }
        
        int min = rolls[0];
        int sum = rolls[0];
        for (int i = 1; i < 4; i++) {
            if (rolls[i] < min) {
                min = rolls[i];
            }
            sum += rolls[i];
        }
        
        return sum - min;
    }

    private static int modifier(int input) {
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