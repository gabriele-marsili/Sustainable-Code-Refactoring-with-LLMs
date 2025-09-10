#include "allergies.h"

bool is_allergic_to(allergen_t allergen, unsigned int score)
{
  return (score & (1U << allergen)) != 0;
}

allergen_list_t get_allergens(unsigned int score)
{
  allergen_list_t allergen_list = {0};
  unsigned int mask = score;

  for (allergen_t allergen = ALLERGEN_EGGS; allergen < ALLERGEN_COUNT && mask; allergen++, mask >>= 1)
  {
    if (mask & 1)
    {
      allergen_list.allergens[allergen] = true;
      allergen_list.count++;
    }
  }

  return allergen_list;
}