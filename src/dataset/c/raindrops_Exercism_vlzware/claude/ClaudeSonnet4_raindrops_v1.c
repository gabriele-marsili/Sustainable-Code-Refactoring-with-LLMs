#include "raindrops.h"
#include <stdio.h>

void convert(char *buf, int drops)
{
   char *p = buf;
   
   if (drops % 3 == 0) {
       *p++ = 'P'; *p++ = 'l'; *p++ = 'i'; *p++ = 'n'; *p++ = 'g';
   }
   if (drops % 5 == 0) {
       *p++ = 'P'; *p++ = 'l'; *p++ = 'a'; *p++ = 'n'; *p++ = 'g';
   }
   if (drops % 7 == 0) {
       *p++ = 'P'; *p++ = 'l'; *p++ = 'o'; *p++ = 'n'; *p++ = 'g';
   }
   
   if (p == buf) {
       sprintf(buf, "%i", drops);
   } else {
       *p = '\0';
   }
}

void mcat(int *pos, const char *dst, const char *src_)
{
   char *src = (char*) src_;
   char *tmp = (char*) dst + *pos;
   while ((*tmp++ = *src++))
       (*pos)++;
   *tmp = '\0';
}

int check_mod(int a, int b)
{
   return (a % b == 0);
}