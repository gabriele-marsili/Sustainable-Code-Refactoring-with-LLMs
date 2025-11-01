#include "allergies.h"

bool is_allergic_to(allergen_t allergen, int n) {
    if (n < 0 || n > 255) {
        n &= 255; // Wrap around to 0-255 range
    }

    return (n & allergen) != 0;
}

allergen_list_t get_allergens(int n) {
    allergen_list_t list = {0};
    list.count = 0;

    if (n < 0 || n > 255) {
        n &= 255; // Wrap around to 0-255 range
    }

    for (int i = 0; i < ALLERGEN_COUNT; i++) {
        allergen_t allergen_value = (allergen_t)(1 << i);
        if (n & allergen_value) {
            list.allergens[i] = true;
            list.count++;
        }
    }
    return list;
}