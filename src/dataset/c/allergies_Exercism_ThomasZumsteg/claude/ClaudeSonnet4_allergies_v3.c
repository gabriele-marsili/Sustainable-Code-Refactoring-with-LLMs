#include "allergies.h"
#include <stdlib.h>
#include <stdio.h>

void get_allergens(int score, Allergen_List_t *items) {
    items->count = 0;
    
    if (score == 0) {
        items->allergens = NULL;
        return;
    }
    
    int temp_allergens[Allergen_Count];
    int count = 0;
    
    for (Allergen_t a = Allergen_Eggs; a < Allergen_Count && score; a++) {
        int allergen_bit = 1 << a;
        if (score & allergen_bit) {
            temp_allergens[count++] = a;
            score &= ~allergen_bit;
        }
    }
    
    if (count == 0) {
        items->allergens = NULL;
    } else {
        items->allergens = malloc(sizeof(Allergen_t) * count);
        for (int i = 0; i < count; i++) {
            items->allergens[i] = temp_allergens[i];
        }
    }
    
    items->count = count;
}

int is_allergic_to(Allergen_t allergy, int score) {
    return (1 << allergy) & score;
}