#include "clock.h"
#include <stdio.h>
#include <stdlib.h>

#define CLOCK_FMT  "%02d:%02d"

void clock(time_text_t time_text, int hour, int minute) {
    hour = (hour + minute / 60) % 24;
    minute %= 60;

    if (minute < 0) {
        minute += 60;
        hour = (hour + 23) % 24; // Equivalent to hour - 1, but avoids negative modulo
    }

    if (hour < 0) {
        hour += 24;
    }

    sprintf(time_text, CLOCK_FMT, hour, minute);
}

void clock_add(time_text_t time_text, int minute_offset) {
    int hour, minute;
    if (sscanf(time_text, CLOCK_FMT, &hour, &minute) == 2) {
        clock(time_text, hour, minute + minute_offset);
    } else {
        // Handle parsing error, e.g., set to a default time or log an error
        clock(time_text, 0, 0); // Example: set to 00:00 on error
    }
}