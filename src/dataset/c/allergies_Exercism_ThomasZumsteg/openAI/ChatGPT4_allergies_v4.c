#include "allergies.h"
#include <stdlib.h>

void get_allergens(int score, Allergen_List_t *items) {
    static const size_t allergen_size = sizeof(Allergen_t) * Allergen_Count;
    items->allergens = malloc(allergen_size);
    if (!items->allergens) {
        items->count = 0;
        return;
    }
    size_t count = 0;
    for (Allergen_t a = Allergen_Eggs; a < Allergen_Count; a++) {
        if (score & (1 << a)) {
            items->allergens[count++] = a;
        }
    }
    items->count = count;
}

int is_allergic_to(Allergen_t allergy, int score) {
    return (score & (1 << allergy)) != 0;
}