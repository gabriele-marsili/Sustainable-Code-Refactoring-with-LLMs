#include "clock.h"
#include <stdio.h>

#define CLOCK_FMT  "%02d:%02d"
#define MINUTES_IN_HOUR 60
#define HOURS_IN_DAY 24

void clock(time_text_t time_text, int hour, int minute) {
    minute += (hour * MINUTES_IN_HOUR);
    minute %= (HOURS_IN_DAY * MINUTES_IN_HOUR);

    if (minute < 0) {
        minute += (HOURS_IN_DAY * MINUTES_IN_HOUR);
    }

    hour = minute / MINUTES_IN_HOUR;
    minute %= MINUTES_IN_HOUR;

    sprintf(time_text, CLOCK_FMT, hour, minute);
}

void clock_add(time_text_t time_text, int minute_offset) {
    int hour, minute;
    sscanf(time_text, CLOCK_FMT, &hour, &minute);
    clock(time_text, hour, minute + minute_offset);
}