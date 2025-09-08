#include "meetup.h"
#include <time.h>
#include <string.h>

static int weekday_in_week(int year, int month, int weekday, int start_day, int diff) {
    struct tm day = { .tm_year = year - 1900, .tm_mon = month - 1, .tm_mday = start_day,
                       .tm_hour = 12, .tm_min = 0, .tm_sec = 0 };
    mktime(&day);

    for (int i = 0; i < 7; ++i) {
        if (day.tm_wday == weekday && day.tm_mon == month - 1) {
            return day.tm_mday;
        }
        day.tm_mday += diff;
        mktime(&day);
    }
    return 0;
}

static int weekday_to_int(const char *weekday) {
    if (weekday == NULL) return -1;

    switch (weekday[0]) {
        case 'S':
            if (weekday[1] == 'a') return 6; // Saturday
            else if (weekday[1] == 'u') return 0; // Sunday
            break;
        case 'M': return 1; // Monday
        case 'T':
            if (weekday[1] == 'u') return 2; // Tuesday
            else if (weekday[1] == 'h') return 4; // Thursday
            break;
        case 'W': return 3; // Wednesday
        case 'F': return 5; // Friday
        default: return -1;
    }
    return -1;
}

int meetupDayOfMonth(int year, int month, const char* week, const char* dayOfWeek) {
    int weekday = weekday_to_int(dayOfWeek);
    if (weekday == -1) return -1;

    int start_day = 0;
    int diff = 1;

    if (strcmp(week, "first") == 0) {
        start_day = 1;
    } else if (strcmp(week, "second") == 0) {
        start_day = 8;
    } else if (strcmp(week, "third") == 0) {
        start_day = 15;
    } else if (strcmp(week, "fourth") == 0) {
        start_day = 22;
    } else if (strcmp(week, "fifth") == 0) {
        start_day = 29;
    } else if (strcmp(week, "teenth") == 0) {
        start_day = 13;
    } else if (strcmp(week, "last") == 0) {
        struct tm last_day = { .tm_year = year - 1900, .tm_mon = month, .tm_mday = 0,
                               .tm_hour = 12, .tm_min = 0, .tm_sec = 0 };
        mktime(&last_day);
        start_day = last_day.tm_mday;
        diff = -1;
    } else {
        return -1;
    }

    return weekday_in_week(year, month, weekday, start_day, diff);
}