#include "luhn.h"
#include <stdlib.h>
#include <stdio.h>
#include <ctype.h>
#include <string.h>

bool luhn(const char *num)
{
    if (num == NULL) return false;
    size_t strLength = strlen(num);
    if(strLength < 2) return false;
    if(strLength == 2 && num[1] == '0') return false;
    int result = 0;
    int counter = 1;
    for(size_t i = strLength -1; i < strLength ;--i)
    {
        if(num[i] == ' ') continue;
        if(!isdigit(num[i])) return false;
        if(counter % 2 == 0)
        {
            int doubled = (num[i] - '0') * 2;
            if(doubled>9) doubled -=9;
            result += doubled;
        }
        else 
            result += (num[i] - '0');
        counter++;
    }
    return (result % 10 == 0);
}
