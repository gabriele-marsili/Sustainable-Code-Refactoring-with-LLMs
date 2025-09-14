#include "allergies.h"
#include <stdlib.h>
#include <stdio.h>

void get_allergens(int score, Allergen_List_t *items) {
    items->count = 0;
    items->allergens = malloc(sizeof(Allergen_t) * Allergen_Count);
    
    // Mask score to only consider valid allergen bits
    score &= (1 << Allergen_Count) - 1;
    
    for(Allergen_t a = Allergen_Eggs; a < Allergen_Count && score; a++){
        int allergen_bit = 1 << a;
        if(score & allergen_bit) {
            items->allergens[items->count++] = a;
            score &= ~allergen_bit; // Clear processed bit
        }
    }
}

int is_allergic_to(Allergen_t allergy, int score) {
    return (1 << allergy) & score;
}