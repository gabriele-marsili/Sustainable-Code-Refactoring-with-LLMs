#include "raindrops.h"
#include <stdio.h>

void convert(char *buf, int drops)
{
   int pos = 0;
   
   if (drops % 3 == 0) {
   	buf[pos++] = 'P'; buf[pos++] = 'l'; buf[pos++] = 'i'; buf[pos++] = 'n'; buf[pos++] = 'g';
   }
   if (drops % 5 == 0) {
   	buf[pos++] = 'P'; buf[pos++] = 'l'; buf[pos++] = 'a'; buf[pos++] = 'n'; buf[pos++] = 'g';
   }
   if (drops % 7 == 0) {
   	buf[pos++] = 'P'; buf[pos++] = 'l'; buf[pos++] = 'o'; buf[pos++] = 'n'; buf[pos++] = 'g';
   }
   
   if (pos == 0) {
   	sprintf(buf, "%i", drops);
   } else {
   	buf[pos] = '\0';
   }
}