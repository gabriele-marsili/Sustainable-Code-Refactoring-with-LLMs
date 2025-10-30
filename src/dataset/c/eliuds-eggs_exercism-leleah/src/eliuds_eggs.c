#include "eliuds_eggs.h"
int egg_count(int bit)
{
    int egg=0;
  
    int i = 0;
   for(i = 31; i >= 0; i--)
   {
     if((bit & (1 << i)) != 0)
     {
       egg++;
     }
   }
    return egg;
    
}