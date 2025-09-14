#include "allergies.h"

bool is_allergic_to(allergen_t allergen, unsigned int score)
{
  return (score & (1U << allergen)) != 0;
}

allergen_list_t get_allergens(unsigned int score)
{
  allergen_list_t allergen_list = {0};
  
  if (score == 0) {
    return allergen_list;
  }
  
  for (allergen_t allergen = ALLERGEN_EGGS; allergen < ALLERGEN_COUNT && score; allergen++)
  {
    const unsigned int mask = 1U << allergen;
    if (score & mask) {
      allergen_list.count++;
      allergen_list.allergens[allergen] = true;
      score &= ~mask;
    }
  }

  return allergen_list;
}