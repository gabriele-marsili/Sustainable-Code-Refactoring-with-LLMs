#include "perfect_numbers.h"

int classify_number(int num)
{
    int i = 1, sum=0;
    for(int j=1;j<num;j++)
    {
        if(num%i == 0)
        {
            sum=sum+i;
            
        } 
        i++;
    }
 if(num > 0)
 {
    if(sum==num)
    {
        return 1;
    }
    else if(sum>num)
    {
        return 2;
    }
    else if(sum<num)
    {
        return 3;
    }
 }
else
    {
        return -1;
    }
    return 0;
}