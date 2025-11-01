#include "gigasecond.h"
#include <time.h>
#include <stdio.h>

void gigasecond(time_t input, char *output, size_t size)
{
    time_t gigasecond_time = input + 1000000000; // Add 1 gigasecond directly
    struct tm *time_info = gmtime(&gigasecond_time); // Use gmtime for thread safety and efficiency
    strftime(output, size, "%Y-%m-%d %H:%M:%S", time_info); // Format the time into the output buffer
}