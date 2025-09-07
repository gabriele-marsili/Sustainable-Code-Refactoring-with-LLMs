#include "gigasecond.h"

#include <stdio.h>
#include <time.h>

void gigasecond(time_t input, char *output, size_t size) {
    input += 1000000000; // Avoid pow() for efficiency
    struct tm gigasecond_time;
    gmtime_r(&input, &gigasecond_time); // Use thread-safe gmtime_r
    strftime(output, size, "%F %T", &gigasecond_time);
}