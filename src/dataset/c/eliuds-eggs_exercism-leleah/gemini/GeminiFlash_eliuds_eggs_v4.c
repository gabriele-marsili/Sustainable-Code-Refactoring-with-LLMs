#include "eliuds_eggs.h"

int egg_count(int bit) {
  int egg = 0;
  unsigned int ubit = (unsigned int)bit;

  while (ubit) {
    egg += ubit & 1;
    ubit >>= 1;
  }

  return egg;
}