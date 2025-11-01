#include "allergies.h"

bool is_allergic_to(allergen_t allergen, int n) {
    return (n & allergen) != 0;
}

allergen_list_t get_allergens(int n) {
    allergen_list_t list = {0};
    list.count = 0;

    if (n & ALLERGEN_EGGS) {
        list.allergens[0] = true;
        list.count++;
    }
    if (n & ALLERGEN_PEANUTS) {
        list.allergens[1] = true;
        list.count++;
    }
    if (n & ALLERGEN_SHELLFISH) {
        list.allergens[2] = true;
        list.count++;
    }
    if (n & ALLERGEN_STRAWBERRIES) {
        list.allergens[3] = true;
        list.count++;
    }
    if (n & ALLERGEN_TOMATOES) {
        list.allergens[4] = true;
        list.count++;
    }
    if (n & ALLERGEN_CHOCOLATE) {
        list.allergens[5] = true;
        list.count++;
    }
    if (n & ALLERGEN_POLLEN) {
        list.allergens[6] = true;
        list.count++;
    }
    if (n & ALLERGEN_CATS) {
        list.allergens[7] = true;
        list.count++;
    }

    return list;
}