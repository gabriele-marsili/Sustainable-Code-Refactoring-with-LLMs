#include "grains.h"

uint64_t square(uint8_t index) 
{ 
    if(index == 1)
    {
        return 1;
    }
    if(index > 64 || index < 1)
    {
        return 0;
    }
    uint64_t mult = 1;
    for (int i = 2; i <= index; i++)
    {
        mult = mult * 2;
    }
    return mult; 
}

uint64_t total(void) 
{ 
    return 0ull -1; 
}
