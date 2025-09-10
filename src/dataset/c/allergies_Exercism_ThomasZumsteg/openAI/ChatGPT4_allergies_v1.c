#include "allergies.h"
#include <stdlib.h>

void get_allergens(int score, Allergen_List_t *items) {
    static Allergen_t allergens[Allergen_Count];
    int count = 0;

    for (Allergen_t a = Allergen_Eggs; a < Allergen_Count; a++) {
        if (score & (1 << a)) {
            allergens[count++] = a;
        }
    }

    items->count = count;
    items->allergens = allergens;
}

int is_allergic_to(Allergen_t allergy, int score) {
    return score & (1 << allergy);
}