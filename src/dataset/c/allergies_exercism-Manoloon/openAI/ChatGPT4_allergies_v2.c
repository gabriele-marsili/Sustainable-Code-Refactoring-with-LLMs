#include "allergies.h"

bool is_allergic_to(allergen_t allergen, int n) 
{
    if (n <= 0 || n >= 256) 
    {
        return false;
    }
    return (n & allergen) != 0;
}

allergen_list_t get_allergens(int n) 
{
    allergen_list_t list = {0};
    list.count = 0;
    n &= 255; // Mask to ensure n is within 8 bits
    for (int i = 0; i < ALLERGEN_COUNT; i++) 
    {
        if (n & (1 << i)) 
        {
            list.allergens[i] = true;
            list.count++;
        } 
        else 
        {
            list.allergens[i] = false;
        }
    }
    return list;
}