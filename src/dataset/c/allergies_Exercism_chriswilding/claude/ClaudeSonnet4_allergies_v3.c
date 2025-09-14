#include "allergies.h"

bool is_allergic_to(allergen_t allergen, unsigned int score)
{
  return (score & (1U << allergen)) != 0;
}

allergen_list_t get_allergens(unsigned int score)
{
  allergen_list_t allergen_list = {0};
  
  score &= (1U << ALLERGEN_COUNT) - 1;
  
  for (allergen_t allergen = ALLERGEN_EGGS; allergen < ALLERGEN_COUNT && score; allergen++)
  {
    if (score & 1U)
    {
      allergen_list.count++;
      allergen_list.allergens[allergen] = true;
    }
    score >>= 1;
  }

  return allergen_list;
}