#include "raindrops.h"
#include <stdio.h>
#include <string.h>

void convert(char result[], int drops)
{
    result[0] = '\0';
    if(drops <= 2)
    {
        result[0] = (char)(drops + '0');
        result[1] = '\0';
    }
        
    if(drops % 3 == 0)
    {
        strcat(result,"Pling");
    }
    if(drops % 5 == 0)
    {
        strcat(result,"Plang");
    }
    if(drops % 7 == 0)
    {
        strcat(result,"Plong");
    }
    if (result[0] == '\0') 
    {
        char temp[10];
        snprintf(temp, sizeof(temp), "%d", drops);
        strcpy(result, temp);
    }
}