#include "raindrops.h"

void convert(char result[], int drops)
{
    char* ptr = result;
    const int div3 = (drops % 3 == 0);
    const int div5 = (drops % 5 == 0);
    const int div7 = (drops % 7 == 0);
    
    if (div3) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'i'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    if (div5) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'a'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    if (div7) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'o'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    
    if (div3 | div5 | div7) {
        *ptr = '\0';
    } else {
        sprintf(result, "%d", drops);
    }
}