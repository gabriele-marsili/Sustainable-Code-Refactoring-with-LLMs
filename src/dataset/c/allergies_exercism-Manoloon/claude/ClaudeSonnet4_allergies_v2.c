#include "allergies.h"

bool is_allergic_to(allergen_t allergen, int n) 
{
    if (n == 0) return false;
    
    // Normalize n to 0-255 range
    n &= 255;
    
    return (n & allergen) != 0;
}

allergen_list_t get_allergens(int n) 
{
    allergen_list_t list = {0};
    
    // Normalize n to 0-255 range
    n &= 255;
    
    if (n == 0) return list;
    
    // Count set bits and populate allergens in one pass
    for (int i = 0; i < ALLERGEN_COUNT && n; i++) {
        int bit = 1 << i;
        if (n & bit) {
            list.allergens[i] = true;
            list.count++;
            n &= ~bit; // Clear the bit to potentially exit early
        }
    }
    
    return list;
}