#include "clock.h"
#include <stdio.h>

#define CLOCK_FMT  "%02d:%02d"

static inline void normalize_time(int *hour, int *minute) {
    *hour += *minute / 60;
    *minute %= 60;
    if (*minute < 0) {
        *minute += 60;
        (*hour)--;
    }
    *hour = (*hour % 24 + 24) % 24;
}

void clock(time_text_t time_text, int hour, int minute) {
    normalize_time(&hour, &minute);
    snprintf(time_text, sizeof(time_text_t), CLOCK_FMT, hour, minute);
}

void clock_add(time_text_t time_text, int minute_offset) {
    int hour, minute;
    sscanf(time_text, CLOCK_FMT, &hour, &minute);
    minute += minute_offset;
    normalize_time(&hour, &minute);
    snprintf(time_text, sizeof(time_text_t), CLOCK_FMT, hour, minute);
}