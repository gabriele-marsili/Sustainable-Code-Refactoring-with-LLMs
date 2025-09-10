#include "allergies.h"

bool is_allergic_to(allergen_t allergen, unsigned int score) {
  return (score >> allergen) & 1;
}

allergen_list_t get_allergens(unsigned int score) {
  allergen_list_t allergen_list = {0};
  allergen_t allergen;

  if (score == 0) {
    return allergen_list;
  }

  unsigned int temp_score = score;
  unsigned int allergen_mask = 1;

  for (allergen = ALLERGEN_EGGS; allergen < ALLERGEN_COUNT; allergen++) {
    if (temp_score & allergen_mask) {
      allergen_list.allergens[allergen] = true;
      allergen_list.count++;
    }
    allergen_mask <<= 1;
  }

  return allergen_list;
}