#include "meetup.h"
#include <time.h>
#include <stdlib.h>
#include <string.h>

static const char* weekdays[] = {"Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"};
static const char* weeks[] = {"first", "second", "third", "fourth", "fifth", "teenth", "last"};
static const int week_start_days[] = {1, 8, 15, 22, 29, 13, 0};

int weekday_in_week(struct tm start, int month, int weekday, int diff) {
    int days_checked = 0;
    while (days_checked < 7 && start.tm_mon == month - 1) {
        if (start.tm_wday == weekday)
            return start.tm_mday;
        start.tm_mday += diff;
        mktime(&start);
        days_checked++;
    }
    return 0;
}

int weekday_to_int(const char *weekday) {
    for (int i = 0; i < 7; i++) {
        if (strcmp(weekday, weekdays[i]) == 0)
            return i;
    }
    return -1;
}

int week_to_index(const char *week) {
    for (int i = 0; i < 7; i++) {
        if (strcmp(week, weeks[i]) == 0)
            return i;
    }
    return -1;
}

int meetupDayOfMonth(int year, int month, const char* week, const char* dayOfWeek) {
    int weekday = weekday_to_int(dayOfWeek);
    if (weekday == -1) return -1;
    
    int week_index = week_to_index(week);
    if (week_index == -1) return -1;
    
    struct tm date = {
        .tm_sec = 0, .tm_min = 0, .tm_hour = 0,
        .tm_year = year, .tm_mon = month - 1,
        .tm_mday = week_start_days[week_index]
    };
    
    int diff = 1;
    if (week_index == 6) { // "last"
        date.tm_mon++;
        diff = -1;
    }
    
    mktime(&date);
    return weekday_in_week(date, month, weekday, diff);
}