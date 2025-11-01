#include "eliuds_eggs.h"

int egg_count(int num) {
    if (num < 2) return num;
    int count = 0;
    while (num) {
        count += (num & 1);
        num >>= 1;
    }
    return count;
}