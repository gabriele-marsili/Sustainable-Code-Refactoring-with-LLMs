#include "raindrops.h"
#include <stdio.h>

const char *convert(char *buffer, size_t buffer_length, int number) {
   const int mod3 = number % 3;
   const int mod5 = number % 5;
   const int mod7 = number % 7;
   
   if (mod3 == 0 | mod5 == 0 | mod7 == 0) {
       char *ptr = buffer;
       char *end = buffer + buffer_length - 1;
       
       if (mod3 == 0 && ptr < end) {
           *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'i'; *ptr++ = 'n'; *ptr++ = 'g';
       }
       if (mod5 == 0 && ptr < end) {
           *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'a'; *ptr++ = 'n'; *ptr++ = 'g';
       }
       if (mod7 == 0 && ptr < end) {
           *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'o'; *ptr++ = 'n'; *ptr++ = 'g';
       }
       *ptr = '\0';
       return buffer;
   }

   snprintf(buffer, buffer_length, "%d", number);
   return buffer;
}