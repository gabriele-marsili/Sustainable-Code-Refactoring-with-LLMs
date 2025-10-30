#include "binary.h"

int convert(const char *input)
{       int res=0;
        for(int j=((int)strlen(input)-1); j>=0; j-- )
        {
            if (input[j]!='0' && input[j]!= '1')
          {
              return INVALID;
          }
            if(input[j]=='1'){

             //res+=pow(2,j);   
            res += (1 << (strlen(input) - 1 - j)); 
            }  
        }
        
    return res;
   
}