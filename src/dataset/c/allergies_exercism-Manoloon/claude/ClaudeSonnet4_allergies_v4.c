#include "allergies.h"

bool is_allergic_to(allergen_t allergen, int n) 
{
    if (n == 0) return false;
    
    n &= 255;
    
    return (n & allergen) != 0;
}

allergen_list_t get_allergens(int n) 
{
    allergen_list_t list = {0};
    
    n &= 255;
    
    int count = 0;
    for (int i = 0; i < ALLERGEN_COUNT; i++) {
        if (n & (1 << i)) {
            list.allergens[i] = true;
            count++;
        }
    }
    list.count = count;
    
    return list;
}