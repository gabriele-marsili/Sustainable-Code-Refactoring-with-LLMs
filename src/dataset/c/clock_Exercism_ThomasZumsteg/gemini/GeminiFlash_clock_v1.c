#include "clock.h"
#include <stdio.h>
#include <stdlib.h>

#define CLOCK_FMT  "%02d:%02d"
#define MINUTES_IN_HOUR 60
#define HOURS_IN_DAY 24

void clock(time_text_t time_text, int hour, int minute) {
    minute %= MINUTES_IN_HOUR;
    if (minute < 0) {
        minute += MINUTES_IN_HOUR;
        hour--;
    }

    hour = (hour + minute / MINUTES_IN_HOUR) % HOURS_IN_DAY;
    if (hour < 0) {
        hour += HOURS_IN_DAY;
    }

    minute %= MINUTES_IN_HOUR; // Ensure minute is positive after hour adjustment

    sprintf(time_text, CLOCK_FMT, hour, minute);
}

void clock_add(time_text_t time_text, int minute_offset) {
    int hour, minute;
    if (sscanf(time_text, CLOCK_FMT, &hour, &minute) == 2) {
        clock(time_text, hour, minute + minute_offset);
    } else {
        // Handle parsing error, e.g., set to default time or log an error
        sprintf(time_text, "00:00"); // Set to default time
    }
}