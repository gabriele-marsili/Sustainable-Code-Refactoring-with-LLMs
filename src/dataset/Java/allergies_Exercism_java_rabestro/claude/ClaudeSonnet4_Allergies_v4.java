import java.util.Collection;
import java.util.EnumSet;

class Allergies {
    private final EnumSet<Allergen> allergies;

    public Allergies(int allergyScore) {
        allergies = EnumSet.noneOf(Allergen.class);
        for (Allergen allergen : Allergen.values()) {
            if ((allergen.getScore() & allergyScore) != 0) {
                allergies.add(allergen);
            }
        }
    }

    public boolean isAllergicTo(Allergen allergen) {
        return allergies.contains(allergen);
    }

    public Collection<Allergen> getList() {
        return allergies;
    }
}