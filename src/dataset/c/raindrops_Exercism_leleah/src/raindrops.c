#include "raindrops.h"
void convert(char result[], int drops)
{
    if(drops %3 ==0 && drops % 5 == 0 && drops %7 ==0)
    {
        sprintf(result,"PlingPlangPlong");
    }
    else if(drops %3 ==0 && drops % 5 == 0)
    {
        sprintf(result,"PlingPlang");
    }
    else if(drops % 5 == 0 && drops %7 ==0)
    {
        sprintf(result,"PlangPlong");
    }
    else if (drops % 3 == 0 && drops %7 ==0)
    {
        sprintf(result,"PlingPlong");
    }
    else if (drops % 3 == 0)
    {
        sprintf(result,"Pling");
    }
    else if (drops % 5 ==0)
    {
        sprintf(result,"Plang");
    }
    else if (drops % 7 ==0)
    {
        sprintf(result,"Plong");
    }
    else if (drops %3 != 0 && drops %5 != 0 && drops % 7!=0)
    {sprintf(result,"%d",drops);}
}