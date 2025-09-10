#include "allergies.h"
#include <stdbool.h>

allergen_list_t get_allergens(int input) {
    allergen_list_t new_list = {.count = 0};
    uint8_t value = input & 255;

    if (value == 0) {
        return new_list;
    }

    for (size_t i = 0; i < ALLERGEN_COUNT; ++i) {
        new_list.allergens[i] = (value >> i) & 1;
        new_list.count += new_list.allergens[i];
        if ((1 << (i+1)) > 255 && (value >> (i+1)) == 0) break;
    }

    return new_list;
}

bool is_allergic_to(allergen_t allergy, int value) {
    return (value & (1 << allergy)) != 0;
}