#include "allergies.h"

bool is_allergic_to(allergen_t allergen, unsigned int score) {
  return (score >> allergen) & 1;
}

allergen_list_t get_allergens(unsigned int score) {
  allergen_list_t allergen_list = {0};
  unsigned int temp_score = score;
  allergen_t allergen = ALLERGEN_EGGS;

  while (temp_score > 0 && allergen < ALLERGEN_COUNT) {
    if (temp_score & 1) {
      allergen_list.allergens[allergen] = true;
      allergen_list.count++;
    }
    temp_score >>= 1;
    allergen++;
  }

  return allergen_list;
}