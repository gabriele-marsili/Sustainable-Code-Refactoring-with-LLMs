#include "eliuds_eggs.h"
int egg_count(int bit)
{
    return __builtin_popcount(bit);
}