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
    n &= 255; // Limit n to 8 bits
    for (int i = 0; i < ALLERGEN_COUNT; i++) 
    {
        if (n & (1 << i)) 
        {
            list.allergens[i] = true;
            list.count++;
        }
    }
    return list;
}