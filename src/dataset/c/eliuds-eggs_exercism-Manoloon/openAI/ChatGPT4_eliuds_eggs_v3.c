#include "eliuds_eggs.h"

int egg_count(int num) 
{ 
    return __builtin_popcount(num);
}