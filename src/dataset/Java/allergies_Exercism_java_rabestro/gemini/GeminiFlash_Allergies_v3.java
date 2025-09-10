import java.util.Collection;
import java.util.Collections;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;

class Allergies {
    private final Set<Allergen> allergies;

    public Allergies(int allergyScore) {
        EnumSet<Allergen> allergenSet = EnumSet.noneOf(Allergen.class);
        for (Allergen allergen : Allergen.values()) {
            if ((allergen.getScore() & allergyScore) > 0) {
                allergenSet.add(allergen);
            }
        }
        allergies = Collections.unmodifiableSet(allergenSet);
    }

    public boolean isAllergicTo(Allergen allergen) {
        return allergies.contains(allergen);
    }

    public Collection<Allergen> getList() {
        return allergies;
    }
}