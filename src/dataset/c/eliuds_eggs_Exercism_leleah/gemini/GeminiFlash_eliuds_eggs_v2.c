#include "eliuds_eggs.h"

int egg_count(int bit) {
    int count = 0;
    unsigned int ubit = (unsigned int)bit; // Avoid potential issues with signed integers

    while (ubit != 0) {
        ubit &= (ubit - 1); // Clear the least significant bit
        count++;
    }

    return count;
}