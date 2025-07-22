#include "raindrops.h"

void convert(char result[], int drops)
{
    const char* ptr = result;
    const int mod3 = drops % 3;
    const int mod5 = drops % 5;
    const int mod7 = drops % 7;
    
    if (mod3 == 0) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'i'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    if (mod5 == 0) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'a'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    if (mod7 == 0) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'o'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    
    if (ptr == result) {
        if (drops < 10) {
            *ptr++ = '0' + drops;
        } else {
            int temp = drops;
            char* end = ptr;
            while (temp > 0) {
                *end++ = '0' + (temp % 10);
                temp /= 10;
            }
            ptr = end;
            char* start = result;
            end--;
            while (start < end) {
                char temp_char = *start;
                *start++ = *end;
                *end-- = temp_char;
            }
        }
    }
    
    *ptr = '\0';
}