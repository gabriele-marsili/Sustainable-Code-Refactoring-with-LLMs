import java.util.Collection;
import java.util.List;
import java.util.ArrayList;

class Allergies {
    private final List<Allergen> allergies;

    public Allergies(int allergyScore) {
        allergies = new ArrayList<>();
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