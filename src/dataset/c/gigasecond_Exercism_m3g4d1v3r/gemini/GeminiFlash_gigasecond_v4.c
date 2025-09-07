#include "gigasecond.h"
#include <time.h>

void gigasecond(time_t input, char *output, size_t size) {
    time_t gigasecond_added = input + 1000000000;
    struct tm *gigasecond_time = gmtime(&gigasecond_added);
    if (gigasecond_time != NULL) {
        strftime(output, size, "%F %T", gigasecond_time);
    } else {
        output[0] = '\0';
    }
}