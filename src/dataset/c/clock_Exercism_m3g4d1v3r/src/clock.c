#include "clock.h"

int mod(int x, int y) {
    int result;

    result = x % y;
    if (result < 0) result += y;
    return (result);
}

clock_t clock_create(int hour, int minute) {
    clock_t new_clock;

    sprintf(new_clock.text, "00:00");
    if (minute < 0)
        new_clock = clock_subtract(new_clock, -1 * minute);
    else
        new_clock = clock_add(new_clock, minute);
    if (hour < 0)
        new_clock = clock_subtract(new_clock, -1 * hour * 60);
    else
        new_clock = clock_add(new_clock, hour * 60);
    return new_clock;
}

clock_t clock_add(clock_t clock, int minute_add) {
    int curr_hour, curr_minute;

    if (minute_add < 0) return clock_subtract(clock, -1 * minute_add);
    sscanf(clock.text, "%d:%d", &curr_hour, &curr_minute);
    if ((curr_minute + minute_add) / 60.0 > 0.0) {
        curr_hour =
            mod(curr_hour + floor((curr_minute + minute_add) / 60.0), 24);
    }
    curr_minute = mod(curr_minute + minute_add, 60);
    sprintf(clock.text, "%02d:%02d", curr_hour, curr_minute);
    return (clock);
}

clock_t clock_subtract(clock_t clock, int minute_subtract) {
    int curr_hour, curr_minute;

    if (minute_subtract < 0) return clock_add(clock, -1 * minute_subtract);
    sscanf(clock.text, "%d:%d", &curr_hour, &curr_minute);
    if ((curr_minute - minute_subtract) / 60.0 < 0.0) {
        curr_hour =
            mod(curr_hour + floor((curr_minute - minute_subtract) / 60.0), 24);
    }
    curr_minute = mod(curr_minute - minute_subtract, 60);
    sprintf(clock.text, "%02d:%02d", curr_hour, curr_minute);
    return (clock);
}

bool clock_is_equal(clock_t a, clock_t b) {
    return (strcmp(a.text, b.text) == 0);
}
