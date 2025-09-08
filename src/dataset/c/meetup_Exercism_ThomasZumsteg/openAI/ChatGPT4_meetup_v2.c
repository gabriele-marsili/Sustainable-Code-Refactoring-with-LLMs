#include "meetup.h"
#include <time.h>
#include <stdlib.h>
#include <string.h>

static inline int weekday_to_int(const char *weekday) {
    switch (weekday[0]) {
        case 'S': return (weekday[1] == 'a') ? 0 : 1; // Saturday or Sunday
        case 'M': return 2; // Monday
        case 'T': return (weekday[1] == 'u') ? 3 : 5; // Tuesday or Thursday
        case 'W': return 4; // Wednesday
        case 'F': return 6; // Friday
        default: return -1; // Error
    }
}

static inline int calculate_start_day(const char *week) {
    if (strcmp(week, "first") == 0) return 1;
    if (strcmp(week, "second") == 0) return 8;
    if (strcmp(week, "third") == 0) return 15;
    if (strcmp(week, "fourth") == 0) return 22;
    if (strcmp(week, "fifth") == 0) return 29;
    if (strcmp(week, "teenth") == 0) return 13;
    return -1; // Error
}

int meetupDayOfMonth(int year, int month, const char* week, const char* dayOfWeek) {
    struct tm date = { .tm_min = 0, .tm_hour = 0, .tm_sec = 0, .tm_year = year - 1900, .tm_mon = month - 1 };
    int weekday = weekday_to_int(dayOfWeek);
    if (weekday == -1) return -1; // Error

    int start_day = calculate_start_day(week);
    int diff = 1;

    if (start_day == -1) {
        if (strcmp(week, "last") == 0) {
            date.tm_mday = 1;
            date.tm_mon++;
            mktime(&date);
            date.tm_mday -= 1; // Move to the last day of the previous month
            mktime(&date);
            diff = -1;
        } else {
            return -1; // Error
        }
    } else {
        date.tm_mday = start_day;
    }

    mktime(&date);
    while (date.tm_wday != weekday) {
        date.tm_mday += diff;
        mktime(&date);
    }

    return date.tm_mday;
}