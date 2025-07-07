#include "raindrops.h"
#include <stdio.h>
#include <string.h>

char *convert(char* sound, size_t len, int num) {
   char *pos = sound;
   char *end = sound + len - 1;
   
   if (num % 3 == 0) {
       memcpy(pos, "Pling", 5);
       pos += 5;
   }
   if (num % 5 == 0 && pos < end - 5) {
       memcpy(pos, "Plang", 5);
       pos += 5;
   }
   if (num % 7 == 0 && pos < end - 5) {
       memcpy(pos, "Plong", 5);
       pos += 5;
   }
   
   if (pos == sound) {
       pos += snprintf(sound, len, "%d", num);
   }
   
   *pos = '\0';
   return sound;
}