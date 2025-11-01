#include "allergies.h"

bool is_allergic_to(allergen_t allergen, int n) {
    if (n > 255) {
        n %= 256;
    }

    if (n == 0) {
        return false;
    }

    return (n & allergen) != 0;
}

allergen_list_t get_allergens(int n) {
    allergen_list_t list = {0};
    list.count = 0;

    if (n > 255) {
        n %= 256;
    }
    
    for (int i = 0; i < ALLERGEN_COUNT; i++) {
        int allergen_value = 1 << i;
        if (n & allergen_value) {
            list.allergens[i] = true;
            list.count++;
        } else {
            list.allergens[i] = false;
        }
    }
    return list;
}