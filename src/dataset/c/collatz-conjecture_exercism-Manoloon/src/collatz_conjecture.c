#include "collatz_conjecture.h"
int steps(int start) 
{
    if(start <= 0) return ERROR_VALUE;
    if(start == 1) return 0;
    int steps=0;
    while(start >1)
    {
        if(start % 2 == 0)
        {
            start = start / 2;
            steps++;
            continue;
        }
        else
        {
            start = (start * 3) + 1;
            steps++;
            continue;
        }
    }
     return steps; 
}
