#include "raindrops.h"

void convert(char result[], int drops)
{
    const bool div3 = (drops % 3 == 0);
    const bool div5 = (drops % 5 == 0);
    const bool div7 = (drops % 7 == 0);
    
    char *ptr = result;
    
    if (div3) {
        strcpy(ptr, "Pling");
        ptr += 5;
    }
    if (div5) {
        strcpy(ptr, "Plang");
        ptr += 5;
    }
    if (div7) {
        strcpy(ptr, "Plong");
        ptr += 5;
    }
    
    if (!(div3 || div5 || div7)) {
        sprintf(result, "%d", drops);
    }
}