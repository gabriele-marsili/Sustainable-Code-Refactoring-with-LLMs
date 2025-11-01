#include "eliuds_eggs.h"

int egg_count(int num) 
{ 
    if(num <= 0) return 0;
    return __builtin_popcount(num);
}