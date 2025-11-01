#include "gigasecond.h"
#include <time.h>

void gigasecond(time_t input, char *output, size_t size)
{
    time_t gigasecond_time = input + 1000000000; // Add 1 gigasecond
    struct tm *time_info = localtime(&gigasecond_time);
    if (time_info != NULL && output != NULL && size > 0) {
        strftime(output, size, "%Y-%m-%d %H:%M:%S", time_info);
    }
}