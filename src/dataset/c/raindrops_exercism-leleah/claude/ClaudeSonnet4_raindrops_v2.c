#include "raindrops.h"
void convert(char result[], int drops)
{
    char *ptr = result;
    
    if (drops % 3 == 0) {
        strcpy(ptr, "Pling");
        ptr += 5;
    }
    if (drops % 5 == 0) {
        strcpy(ptr, "Plang");
        ptr += 5;
    }
    if (drops % 7 == 0) {
        strcpy(ptr, "Plong");
        ptr += 5;
    }
    
    if (ptr == result) {
        sprintf(result, "%d", drops);
    } else {
        *ptr = '\0';
    }
}