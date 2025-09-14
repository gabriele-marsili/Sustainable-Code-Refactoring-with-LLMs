#include "allergies.h"

bool is_allergic_to(allergen_t allergen, unsigned int score)
{
  return (score >> allergen) & 1;
}

allergen_list_t get_allergens(unsigned int score)
{
  allergen_list_t allergen_list = {0};
  
  // Mask to only consider valid allergen bits
  score &= (1 << ALLERGEN_COUNT) - 1;
  
  // Count set bits efficiently
  unsigned int temp = score;
  while (temp) {
    allergen_list.count++;
    temp &= temp - 1; // Clear lowest set bit
  }
  
  // Set allergen flags directly from score bits
  for (allergen_t allergen = ALLERGEN_EGGS; allergen < ALLERGEN_COUNT; allergen++)
  {
    allergen_list.allergens[allergen] = (score >> allergen) & 1;
  }

  return allergen_list;
}