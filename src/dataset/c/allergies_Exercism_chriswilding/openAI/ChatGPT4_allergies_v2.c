#include "allergies.h"

bool is_allergic_to(allergen_t allergen, unsigned int score)
{
  return (score & (1 << allergen)) != 0;
}

allergen_list_t get_allergens(unsigned int score)
{
  allergen_list_t allergen_list = {0};

  for (allergen_t allergen = ALLERGEN_EGGS; allergen < ALLERGEN_COUNT; allergen++)
  {
    if (score & (1 << allergen))
    {
      allergen_list.allergens[allergen] = true;
      allergen_list.count++;
    }
  }

  return allergen_list;
}