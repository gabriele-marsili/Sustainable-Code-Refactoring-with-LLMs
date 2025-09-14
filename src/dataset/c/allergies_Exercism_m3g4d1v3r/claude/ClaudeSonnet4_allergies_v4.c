#include "allergies.h"

allergen_list_t get_allergens(int input) {
    allergen_list_t new_list;
    uint8_t value = input & 255;
    
    new_list.count = 0;
    if (value == 0) return new_list;
    
    for (uint8_t i = 0; value; i++, value >>= 1) {
        new_list.allergens[i] = value & 1;
        new_list.count += new_list.allergens[i];
    }
    
    return new_list;
}

bool is_allergic_to(allergen_t allergy, int value) {
    return (value & (1 << allergy)) != 0;
}