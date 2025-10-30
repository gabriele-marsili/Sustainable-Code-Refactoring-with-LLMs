#include "eliuds_eggs.h"

int egg_count(int num) 
{ 
    if(num < 2) return num;
    int count = 0;
    while(num > 0)
    {
        if(num % 2 != 0)
        {
            count++;
        }
        num /= 2;
    }
    return count; 
}
