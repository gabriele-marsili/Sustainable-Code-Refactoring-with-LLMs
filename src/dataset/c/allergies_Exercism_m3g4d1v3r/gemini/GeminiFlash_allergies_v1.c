#include "allergies.h"
#include <stdbool.h>

allergen_list_t get_allergens(int input) {
    allergen_list_t new_list;
    uint8_t value = input & 255;
    new_list.count = 0;

    if (value == 0) {
        return new_list;
    }

    for (int i = 0; i < ALLERGEN_COUNT; ++i) {
        new_list.allergens[i] = (value >> i) & 1;
        if (new_list.allergens[i]) {
            new_list.count++;
        }
    }

    return new_list;
}

bool is_allergic_to(allergen_t allergy, int value) {
    return (value & (1 << allergy)) != 0;
}