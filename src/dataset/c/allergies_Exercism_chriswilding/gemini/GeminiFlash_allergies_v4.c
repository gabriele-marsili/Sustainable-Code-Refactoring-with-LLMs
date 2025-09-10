#include "allergies.h"

bool is_allergic_to(allergen_t allergen, unsigned int score) {
  return (score >> allergen) & 1;
}

allergen_list_t get_allergens(unsigned int score) {
  allergen_list_t allergen_list = {0};
  unsigned int allergy_mask = score;

  for (allergen_t allergen = ALLERGEN_EGGS; allergen < ALLERGEN_COUNT; allergen++) {
    if (allergy_mask & 1) {
      allergen_list.allergens[allergen] = true;
      allergen_list.count++;
    }
    allergy_mask >>= 1;
  }

  return allergen_list;
}