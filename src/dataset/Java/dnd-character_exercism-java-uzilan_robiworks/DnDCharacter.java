import java.util.*;

class DnDCharacter {
    public Random rnd = new Random();

    public int strength = ability();
    public int dexterity = ability();
    public int constitution = ability();
    public int intelligence = ability();
    public int wisdom = ability();
    public int charisma = ability();
    public int hitpoints = ability();

    int ability() {
        ArrayList<Integer> rolls = new ArrayList<Integer>();
        for (int i = 0; i < 4; i++) {
            rolls.add(rnd.nextInt(6) + 1);
        }
        rolls.remove(rolls.indexOf(Collections.min(rolls)));
        int sum = 0;
        for (int j = 0; j < rolls.size(); j++) {
            sum += rolls.get(j);
        }
        return sum;
    }

    int modifier(int input) {
        return Math.floorDiv((input - 10), 2);
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
        return 10 + modifier(constitution);
    }

}
