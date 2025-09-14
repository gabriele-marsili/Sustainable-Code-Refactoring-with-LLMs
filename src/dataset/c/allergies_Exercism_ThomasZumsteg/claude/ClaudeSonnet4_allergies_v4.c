#include "allergies.h"
#include <stdlib.h>

void get_allergens(int score, Allergen_List_t *items) {
    items->count = 0;
    items->allergens = malloc(sizeof(Allergen_t) * __builtin_popcount(score & ((1 << Allergen_Count) - 1)));
    
    for (Allergen_t a = Allergen_Eggs; a < Allergen_Count; a++) {
        if (score & (1 << a)) {
            items->allergens[items->count++] = a;
        }
    }
}

int is_allergic_to(Allergen_t allergy, int score) {
    return (score >> allergy) & 1;
}