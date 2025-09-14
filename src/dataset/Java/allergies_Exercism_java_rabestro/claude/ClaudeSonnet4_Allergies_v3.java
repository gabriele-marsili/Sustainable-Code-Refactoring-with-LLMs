import java.util.Collection;
import java.util.List;
import java.util.ArrayList;

class Allergies {
    private final int allergyScore;
    private List<Allergen> allergies;

    public Allergies(int allergyScore) {
        this.allergyScore = allergyScore;
    }

    public boolean isAllergicTo(Allergen allergen) {
        return (allergen.getScore() & allergyScore) > 0;
    }

    public Collection<Allergen> getList() {
        if (allergies == null) {
            allergies = new ArrayList<>();
            for (Allergen allergen : Allergen.values()) {
                if ((allergen.getScore() & allergyScore) > 0) {
                    allergies.add(allergen);
                }
            }
        }
        return allergies;
    }
}