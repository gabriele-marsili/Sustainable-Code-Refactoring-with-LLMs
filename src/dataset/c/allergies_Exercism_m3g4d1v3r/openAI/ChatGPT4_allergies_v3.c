#include "allergies.h"

allergen_list_t get_allergens(int input) {
    allergen_list_t new_list = { .count = 0 };
    uint8_t value = input & 255;

    for (uint8_t i = 0; value > 0; i++, value >>= 1) {
        if (value & 1) {
            new_list.allergens[i] = 1;
            new_list.count++;
        } else {
            new_list.allergens[i] = 0;
        }
    }
    return new_list;
}

bool is_allergic_to(allergen_t allergy, int value) {
    return (value & (1 << allergy)) != 0;
}