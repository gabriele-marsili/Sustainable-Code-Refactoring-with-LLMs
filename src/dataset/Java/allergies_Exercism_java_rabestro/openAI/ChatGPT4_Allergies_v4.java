import java.util.Collection;
import java.util.EnumSet;
import java.util.Set;

class Allergies {
    private final Set<Allergen> allergies;

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
        return Set.copyOf(allergies);
    }
}