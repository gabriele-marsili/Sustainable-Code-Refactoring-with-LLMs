#include "eliuds_eggs.h"

int egg_count(int bit) {
    int egg = 0;
    unsigned int ubit = static_cast<unsigned int>(bit);

    while (ubit) {
        ubit &= (ubit - 1);
        egg++;
    }

    return egg;
}