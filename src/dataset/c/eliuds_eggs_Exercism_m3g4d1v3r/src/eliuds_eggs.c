#include "eliuds_eggs.h"

#include <math.h>

int egg_count(int encode_coop) {
    int factor = log2(encode_coop);
    int egg_count = 0;

    while (factor >= 0) {
        if (((double)encode_coop / pow(2, factor)) >= 1.0) {
            encode_coop -= pow(2, factor);
            egg_count++;
        }
        factor--;
    }
    return (egg_count);
}
