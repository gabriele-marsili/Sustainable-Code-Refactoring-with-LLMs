#include "gigasecond.h"
#include <time.h>

void gigasecond(time_t input, char *output, size_t size) {
    time_t gigasecond_later = input + 1000000000;
    struct tm gigasecond_tm;

    gmtime_r(&gigasecond_later, &gigasecond_tm);
    strftime(output, size, "%F %T", &gigasecond_tm);
}