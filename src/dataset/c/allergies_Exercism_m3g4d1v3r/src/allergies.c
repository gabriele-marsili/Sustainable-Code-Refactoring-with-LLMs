#include "allergies.h"

allergen_list_t get_allergens(int input) {
    allergen_list_t new_list;
    uint8_t value = input & 255;
    uint8_t i;

    i = 0;
    new_list.count = 0;
    if (value == 0) return (new_list);
    do {
        new_list.allergens[i] = value & 1;
        if (new_list.allergens[i] == 1) new_list.count++;
        value = value >> 1;
        i++;
    } while (value > 0);
    return (new_list);
}

bool is_allergic_to(allergen_t allergy, int value) {
    return ((value & (1 << allergy)) > 0);
}
