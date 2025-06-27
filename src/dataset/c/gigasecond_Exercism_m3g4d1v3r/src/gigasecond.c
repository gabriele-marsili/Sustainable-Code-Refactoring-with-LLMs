#include "gigasecond.h"

#include <stdio.h>
#include <time.h>

void gigasecond(time_t input, char *output, size_t size) {
    input += (time_t)pow(10, 9);
    struct tm *gigasecond_time = gmtime(&input);
    strftime(output, size, "%F %T", gigasecond_time);
}
