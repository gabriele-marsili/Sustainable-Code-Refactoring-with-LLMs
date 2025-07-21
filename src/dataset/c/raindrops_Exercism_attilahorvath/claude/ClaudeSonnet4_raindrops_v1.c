#include "raindrops.h"
#include <stdio.h>

const char *convert(char *buffer, size_t buffer_length, int number) {
   const int mod3 = number % 3;
   const int mod5 = number % 5;
   const int mod7 = number % 7;
   
   if (mod3 == 0 || mod5 == 0 || mod7 == 0) {
       char *ptr = buffer;
       char *end = buffer + buffer_length - 1;
       
       if (mod3 == 0) {
           const char *src = "Pling";
           while (*src && ptr < end) *ptr++ = *src++;
       }
       if (mod5 == 0) {
           const char *src = "Plang";
           while (*src && ptr < end) *ptr++ = *src++;
       }
       if (mod7 == 0) {
           const char *src = "Plong";
           while (*src && ptr < end) *ptr++ = *src++;
       }
       
       *ptr = '\0';
       return buffer;
   }

   snprintf(buffer, buffer_length, "%d", number);
   return buffer;
}