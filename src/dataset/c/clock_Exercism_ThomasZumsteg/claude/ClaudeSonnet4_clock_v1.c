#include "clock.h"
#include <stdio.h>

#define CLOCK_FMT  "%02d:%02d"

void clock(time_text_t time_text, int hour, int minute) {
    int total_minutes = hour * 60 + minute;
    
    // Handle negative values efficiently
    if (total_minutes < 0) {
        total_minutes = ((total_minutes % 1440) + 1440) % 1440;
    } else {
        total_minutes %= 1440;
    }
    
    hour = total_minutes / 60;
    minute = total_minutes % 60;
    
    sprintf(time_text, CLOCK_FMT, hour, minute);
}

void clock_add(time_text_t time_text, int minute_offset) {
    // Parse more efficiently by avoiding sscanf overhead
    int hour = (time_text[0] - '0') * 10 + (time_text[1] - '0');
    int minute = (time_text[3] - '0') * 10 + (time_text[4] - '0');
    
    clock(time_text, hour, minute + minute_offset);
}