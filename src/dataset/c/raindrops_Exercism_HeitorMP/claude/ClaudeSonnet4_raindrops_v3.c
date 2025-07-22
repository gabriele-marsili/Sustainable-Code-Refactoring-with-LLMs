#include "raindrops.h"
#include <string.h>
#include <stdio.h>

char *convert(char result[], int drops)
{
    char *ptr = result;
    
    const int mod3 = drops % 3;
    const int mod5 = drops % 5;
    const int mod7 = drops % 7;
    
    if (mod3 == 0) {
        memcpy(ptr, "Pling", 5);
        ptr += 5;
    }
    
    if (mod5 == 0) {
        memcpy(ptr, "Plang", 5);
        ptr += 5;
    }
    
    if (mod7 == 0) {
        memcpy(ptr, "Plong", 5);
        ptr += 5;
    }
    
    if (ptr == result) {
        sprintf(result, "%d", drops);
    } else {
        *ptr = '\0';
    }
    
    return result;
}