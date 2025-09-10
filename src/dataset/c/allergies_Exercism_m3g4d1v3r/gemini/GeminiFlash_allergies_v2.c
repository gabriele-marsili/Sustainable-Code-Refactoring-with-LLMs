#include "allergies.h"
#include <stdbool.h>

allergen_list_t get_allergens(int input) {
    allergen_list_t new_list = {0};
    uint8_t value = input & 255;

    if (value == 0) {
        return new_list;
    }

    for (int i = 0; i < ALLERGEN_COUNT; ++i) {
        if (value & (1 << i)) {
            new_list.allergens[i] = true;
            new_list.count++;
        } else {
            new_list.allergens[i] = false;
        }
    }

    return new_list;
}


bool is_allergic_to(allergen_t allergy, int value) {
    return (value & (1 << allergy)) != 0;
}