class Fighter {

    boolean isVulnerable() {
        return true;
    }

    int getDamagePoints(Fighter fighter) {
        return 1;
    }
}

class Warrior extends Fighter {
    public String toString() {
        return "Fighter is a Warrior";
    }

    @Override
    boolean isVulnerable() {
        return false;
    }

    @Override
    int getDamagePoints(Fighter fighter) {
        return fighter.isVulnerable() ? 10 : 6;
    }
}

class Wizard extends Fighter {
    private boolean isPrepared;

    public String toString() {
        return "Fighter is a Wizard";
    }

    void prepareSpell() {
        this.isPrepared = true;
    }

    @Override
    boolean isVulnerable() {
        return this.isPrepared ? false : true;
    }

    @Override
    int getDamagePoints(Fighter fighter) {
        return this.isPrepared ? 12 : 3;
    }
}
