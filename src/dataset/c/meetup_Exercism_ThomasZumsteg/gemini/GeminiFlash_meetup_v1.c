#include "meetup.h"
#include <time.h>
#include <string.h>

static int weekday_in_week(int year, int month, int start_day, int weekday, int diff) {
    struct tm day = { .tm_year = year - 1900, .tm_mon = month - 1, .tm_mday = start_day, .tm_hour = 12 };
    mktime(&day); // Normalize the date

    int current_day = day.tm_mday;
    int current_wday = day.tm_wday;

    for (int i = 0; i < 7; ++i) {
        if (current_wday == weekday) {
            return current_day;
        }
        current_day += diff;

        // Create a tm struct for the next day
        struct tm next_day = { .tm_year = year - 1900, .tm_mon = month - 1, .tm_mday = current_day, .tm_hour = 12 };
        mktime(&next_day);
        current_wday = next_day.tm_wday;

        if (next_day.tm_mon != month - 1) {
            break;
        }
    }
    return 0;
}

static int weekday_to_int(const char *weekday) {
    switch (weekday[0]) {
        case 'S':
            if (weekday[1] == 'a') return 0; // Saturday
            else return 1; // Sunday
        case 'M': return 2; // Monday
        case 'T':
            if (weekday[1] == 'u') return 3; // Tuesday
            else return 5; // Thursday
        case 'W': return 4; // Wednesday
        case 'F': return 6; // Friday
        default: return -1; // Error
    }
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
        struct tm last_day_of_month = { .tm_year = year - 1900, .tm_mon = month, .tm_mday = 0, .tm_hour = 12 };
        mktime(&last_day_of_month);
        start_day = last_day_of_month.tm_mday;
        diff = -1;
    } else {
        return -1;
    }

    return weekday_in_week(year, month, start_day, weekday, diff);
}