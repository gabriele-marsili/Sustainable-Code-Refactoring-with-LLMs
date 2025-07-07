#include "raindrops.h"

#include <stdio.h>

char *convert(char result[], int drops)
{
   char *ptr = result;
   
   if (drops % 3 == 0) {
       ptr += sprintf(ptr, "Pling");
   }
   
   if (drops % 5 == 0) {
       ptr += sprintf(ptr, "Plang");
   }
   
   if (drops % 7 == 0) {
       ptr += sprintf(ptr, "Plong");
   }
   
   if (ptr == result) {
       sprintf(result, "%d", drops);
   }
   
   return result;
}