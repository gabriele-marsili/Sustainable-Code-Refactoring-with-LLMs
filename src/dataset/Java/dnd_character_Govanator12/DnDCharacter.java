import java.util.Arrays;

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
        int random = (int) (Math.random() * 6) + 1;
        switch (random) {
            case 1:
                return getCharisma();
            case 2:
                return getConstitution();
            case 3:
                return getDexterity();
            case 4:
                return getIntelligence();
            case 5:
                return getWisdom();
            case 6:
                return getStrength();
        }
        return -1;
    }

    int randomDieTotal() {
        int[] numbers = new int[4];

        for (int i = 0; i < 4; i++) {
            int roll = (int) (Math.random() * 6) + 1;
            numbers[i] = roll;
        }

        Arrays.sort(numbers);
        int totalMinusMin = 0;
        for (int i = 1; i < numbers.length; i++) {
            totalMinusMin += numbers[i];
        }

        return totalMinusMin;
    }

    int modifier(double input) {
        double hpModifier = ((input - 10d) / 2d);
        if (hpModifier < 0){
            hpModifier -= .5;
        }
        Math.floor(hpModifier);
        return (int) hpModifier;
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

