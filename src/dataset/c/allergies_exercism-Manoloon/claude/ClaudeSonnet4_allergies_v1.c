#include "allergies.h"

bool is_allergic_to(allergen_t allergen, int n) 
{
    if (n == 0) return false;
    
    // Normalize n to 0-255 range
    n &= 255;
    
    // Simple bitwise check
    return (n & allergen) != 0;
}

allergen_list_t get_allergens(int n) 
{
    allergen_list_t list = {0};
    
    // Normalize n to 0-255 range
    n &= 255;
    
    if (n == 0) return list;
    
    // Count set bits and populate allergens array in one pass
    for (int i = 0; i < ALLERGEN_COUNT; i++) {
        if (n & (1 << i)) {
            list.allergens[i] = true;
            list.count++;
        }
    }
    
    return list;
}