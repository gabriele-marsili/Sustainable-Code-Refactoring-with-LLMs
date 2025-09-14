#include "allergies.h"

bool is_allergic_to(allergen_t allergen, unsigned int score)
{
  return (score >> allergen) & 1;
}

allergen_list_t get_allergens(unsigned int score)
{
  allergen_list_t allergen_list = {0};
  
  for (allergen_t allergen = ALLERGEN_EGGS; allergen < ALLERGEN_COUNT && score; allergen++)
  {
    if (score & 1)
    {
      allergen_list.count++;
      allergen_list.allergens[allergen] = true;
    }
    score >>= 1;
  }

  return allergen_list;
}