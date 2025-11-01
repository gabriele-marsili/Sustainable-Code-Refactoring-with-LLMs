#include "raindrops.h"
#include <stdio.h>

void convert(char result[], int drops)
{
    char *ptr = result;
    
    if(drops % 3 == 0)
    {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'i'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    if(drops % 5 == 0)
    {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'a'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    if(drops % 7 == 0)
    {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'o'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    
    if (ptr == result) 
    {
        if(drops <= 9)
        {
            *ptr++ = (char)(drops + '0');
        }
        else
        {
            int temp = drops;
            char digits[12];
            int count = 0;
            
            while(temp > 0)
            {
                digits[count++] = (char)((temp % 10) + '0');
                temp /= 10;
            }
            
            while(count > 0)
            {
                *ptr++ = digits[--count];
            }
        }
    }
    
    *ptr = '\0';
}