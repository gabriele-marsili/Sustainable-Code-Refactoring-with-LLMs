#include "eliuds_eggs.h"

int egg_count(int bit)
{
    int egg = 0;
    while (bit) {
        egg++;
        bit &= bit - 1;
    }
    return egg;
}