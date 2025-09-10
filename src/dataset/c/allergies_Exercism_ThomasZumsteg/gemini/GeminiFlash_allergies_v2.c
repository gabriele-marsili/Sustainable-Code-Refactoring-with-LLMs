#include "allergies.h"
#include <stdlib.h>
#include <stdio.h>

void get_allergens(int score, Allergen_List_t *items) {
    items->count = 0;
    items->allergens = malloc(sizeof(Allergen_t) * Allergen_Count);
    if (items->allergens == NULL) {
        return; // Handle allocation failure
    }

    for (int i = 0; i < Allergen_Count; ++i) {
        if (is_allergic_to((Allergen_t)i, score)) {
            items->allergens[items->count++] = (Allergen_t)i;
        }
    }
}


int is_allergic_to(Allergen_t allergy, int score) {
    return (1 << allergy) & score;
}