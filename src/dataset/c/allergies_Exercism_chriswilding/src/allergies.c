#include "allergies.h"

bool is_allergic_to(allergen_t allergen, unsigned int score)
{
  return ((1 << allergen) & score) > 0;
}

allergen_list_t get_allergens(unsigned int score)
{
  allergen_list_t allergen_list = {0};

  for (allergen_t allergen = ALLERGEN_EGGS; allergen < ALLERGEN_COUNT; allergen++)
  {
    if (is_allergic_to(allergen, score))
    {
      allergen_list.count++;
      allergen_list.allergens[allergen] = true;
    }
  }

  return allergen_list;
}
