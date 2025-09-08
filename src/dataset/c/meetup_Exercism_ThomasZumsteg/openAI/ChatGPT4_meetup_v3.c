#include "meetup.h"
#include <time.h>
#include <stdlib.h>
#include <string.h>

static int weekday_in_week(const struct tm *start, int month, int weekday, int diff) {
    struct tm day = *start;
    while (abs(day.tm_mday - start->tm_mday) < 7 && day.tm_mon == month - 1) {
        if (day.tm_wday == weekday)
            return day.tm_mday;
        day.tm_mday += diff;
        mktime(&day);
    }
    return 0;
}

static int weekday_to_int(const char *weekday) {
    static const char *weekdays[] = {
        "Saturday", "Sunday", "Monday", "Tuesday", 
        "Wednesday", "Thursday", "Friday"
    };
    for (int i = 0; i < 7; ++i) {
        if (strcmp(weekday, weekdays[i]) == 0)
            return i;
    }
    return -1;
}

int meetupDayOfMonth(int year, int month, const char* week, const char* dayOfWeek) {
    struct tm date = { .tm_year = year - 1900, .tm_mon = month - 1, .tm_mday = 1 };
    int weekday = weekday_to_int(dayOfWeek);
    if (weekday == -1) return -1;

    if (strcmp(week, "first") == 0)
        date.tm_mday = 1;
    else if (strcmp(week, "second") == 0)
        date.tm_mday = 8;
    else if (strcmp(week, "third") == 0)
        date.tm_mday = 15;
    else if (strcmp(week, "fourth") == 0)
        date.tm_mday = 22;
    else if (strcmp(week, "fifth") == 0)
        date.tm_mday = 29;
    else if (strcmp(week, "teenth") == 0)
        date.tm_mday = 13;
    else if (strcmp(week, "last") == 0) {
        date.tm_mon++;
        date.tm_mday = 0;
        mktime(&date);
        date.tm_mday -= 6;
    } else
        return -1;

    mktime(&date);
    return weekday_in_week(&date, month, weekday, (strcmp(week, "last") == 0) ? -1 : 1);
}