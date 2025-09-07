#include "clock.h"
#include <stdio.h>

#define CLOCK_FMT  "%02d:%02d"

void clock(time_text_t time_text, int hour, int minute) {
    minute += hour * 60;
    minute = (minute % 1440 + 1440) % 1440; // Normalize to 0-1439 range
    hour = minute / 60;
    minute %= 60;

    sprintf(time_text, CLOCK_FMT, hour, minute);
}

void clock_add(time_text_t time_text, int minute_offset) {
    int hour, minute;
    sscanf(time_text, CLOCK_FMT, &hour, &minute);
    minute += hour * 60 + minute_offset;
    minute = (minute % 1440 + 1440) % 1440; // Normalize to 0-1439 range
    hour = minute / 60;
    minute %= 60;

    sprintf(time_text, CLOCK_FMT, hour, minute);
}