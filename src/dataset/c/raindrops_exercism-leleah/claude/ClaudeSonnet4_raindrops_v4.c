#include "raindrops.h"

void convert(char result[], int drops)
{
    char *ptr = result;
    
    if (drops % 3 == 0) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'i'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    if (drops % 5 == 0) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'a'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    if (drops % 7 == 0) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'o'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    
    if (ptr == result) {
        int temp = drops;
        int digits = 0;
        if (temp == 0) digits = 1;
        else {
            while (temp > 0) {
                temp /= 10;
                digits++;
            }
        }
        
        ptr += digits;
        *ptr-- = '\0';
        temp = drops;
        do {
            *ptr-- = '0' + (temp % 10);
            temp /= 10;
        } while (temp > 0);
        return;
    }
    
    *ptr = '\0';
}