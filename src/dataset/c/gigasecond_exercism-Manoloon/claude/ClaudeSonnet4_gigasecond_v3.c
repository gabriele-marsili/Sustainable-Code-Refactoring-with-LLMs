#include "gigasecond.h"
#include <time.h>

void gigasecond(time_t input, char *output, size_t size)
{
    time_t gigasecond_later = input + 1000000000;
    struct tm *tm_result = gmtime(&gigasecond_later);
    strftime(output, size, "%Y-%m-%d %H:%M:%S", tm_result);
}