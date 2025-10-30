#include "gigasecond.h"
#include <stdio.h>
/*
60 seg = 1 min
3600 seg = 60 min
86400 segs = 1 day
604800 segs = 1 week
1 000 000 000 = 1 gigasecond
*/
void gigasecond(time_t input, char *output, size_t size)
{
    printf("%lld\n",input);
    char year = strftime(output,20,"%Y-%m-%d %H:%M:%S",localtime(&input));
    printf("%lld\n",input);
    printf("%lld\n",size);
    output = "1000";
    printf("%s\n",output);
}
