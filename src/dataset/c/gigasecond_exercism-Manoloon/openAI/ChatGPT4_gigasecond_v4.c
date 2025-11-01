#include "gigasecond.h"
#include <time.h>
#include <stdio.h>

void gigasecond(time_t input, char *output, size_t size)
{
    time_t gigasecond_time = input + 1000000000;
    if (strftime(output, size, "%Y-%m-%d %H:%M:%S", localtime(&gigasecond_time)) == 0)
    {
        if (size > 0)
            output[0] = '\0'; // Ensure output is null-terminated if strftime fails
    }
}