abstract class Fighter {

    boolean isVulnerable() {
        throw new UnsupportedOperationException("Please provide implementation for this method");
    }

    abstract int damagePoints(Fighter fighter);

}

class Warrior extends Fighter {

    @Override
    public String toString() {
        final String FIGHTER_TYPE = "Warrior";
        return "Fighter is a " + FIGHTER_TYPE;
    }

    @Override
    boolean isVulnerable() {
        return false;
    }

    @Override
    int damagePoints(Fighter fighter) {
        final int BIG_DAMAGE = 10;
        final int SMALL_DAMAGE = 6;
        return fighter.isVulnerable() ? BIG_DAMAGE : SMALL_DAMAGE;
    }
}

class Wizard extends Fighter {
    private boolean isSpellPrepared = false;

    @Override
    public String toString() {
        final String FIGHTER_TYPE = "Wizard";
        return "Fighter is a " + FIGHTER_TYPE;
    }

    @Override
    boolean isVulnerable() {
        return !isSpellPrepared;
    }

    @Override
    int damagePoints(Fighter fighter) {
        final int BIG_DAMAGE = 12;
        final int SMALL_DAMAGE = 3;
        return isSpellPrepared ? BIG_DAMAGE : SMALL_DAMAGE;
    }

    void prepareSpell() {
        isSpellPrepared = true;
    }

}
