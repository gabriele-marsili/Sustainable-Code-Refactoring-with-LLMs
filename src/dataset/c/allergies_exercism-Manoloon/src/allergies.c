#include "allergies.h"

bool is_allergic_to(allergen_t allergen, int n) 
{
    if (n == 0 || n == 256)
    {
        return false;
    }
    if (n == 255 && allergen != ALLERGEN_EGGS)
    {
        return true;
    }
    if (n > 256)
    {
        n -=256;
    }
    //return (n & allergen) != 0;
    if (allergen == ALLERGEN_EGGS)
    {
        int count = n - 1 ;
        return count == 0 || count > 1 ;
    }
    if (allergen == ALLERGEN_PEANUTS)
    {
        int count = n - 2;
        return count == 0 || count > 3;
    }
    if(allergen == ALLERGEN_SHELLFISH)
    {
        int count = n - 4;
        return count == 0 || count > 9;
    }
    if (allergen == ALLERGEN_STRAWBERRIES)
    {
        int count = n - 8;
        return count == 0 || count > 17;
    }
    if (allergen == ALLERGEN_TOMATOES)
    {
        int count = n - 16;
        return count == 0 || count > 33;
    }
    if (allergen == ALLERGEN_CHOCOLATE)
    {
        int count = n - 32;
        return count == 0 || count > 65;
    }
    if (allergen == ALLERGEN_POLLEN)
    {
        int count = n - 64;
        return count == 0 || count > 129;
    }
    if (allergen == ALLERGEN_CATS)
    {
        int count = n - 128;
        return count == 0 || count > 63;
    }
    return true;
}

allergen_list_t get_allergens(int n) 
{
    allergen_list_t list = {0};
    list.count = 0;
    for(int i = 0; i < ALLERGEN_COUNT; i++)
    {
        if(n & (1 << i))
        {
            list.allergens[i] = true;
            list.count++;
        }
    }
    return list;
}
