#include "allergies.h"
#include <stdlib.h>

void get_allergens(int score, Allergen_List_t *items) {
    items->count = 0;
    items->allergens = malloc(sizeof(Allergen_t) * Allergen_Count);
    
    // Use bit manipulation to iterate only through set bits
    int masked_score = score & ((1 << Allergen_Count) - 1);
    
    for(Allergen_t a = Allergen_Eggs; a < Allergen_Count && masked_score; a++){
        int allergen_bit = 1 << a;
        if(masked_score & allergen_bit) {
            items->allergens[items->count++] = a;
            masked_score &= ~allergen_bit; // Clear the processed bit
        }
    }
}

int is_allergic_to(Allergen_t allergy, int score) {
    return (1 << allergy) & score;
}