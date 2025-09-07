#include "gigasecond.h"

#include <stdio.h>
#include <time.h>
#include <math.h>

void gigasecond(time_t input, char *output, size_t size) {
    time_t gigasecond_addition = 1000000000;
    input += gigasecond_addition;
    struct tm *gigasecond_time = gmtime(&input);
    strftime(output, size, "%F %T", gigasecond_time);
}