import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

class Allergies {
    private final List<Allergen> allergies;

    public Allergies(int allergyScore) {
        List<Allergen> allergenList = new ArrayList<>();
        for (Allergen allergen : Allergen.values()) {
            if ((allergen.getScore() & allergyScore) != 0) {
                allergenList.add(allergen);
            }
        }
        allergies = Collections.unmodifiableList(allergenList);
    }

    public boolean isAllergicTo(Allergen allergen) {
        return allergies.contains(allergen);
    }

    public Collection<Allergen> getList() {
        return allergies;
    }
}