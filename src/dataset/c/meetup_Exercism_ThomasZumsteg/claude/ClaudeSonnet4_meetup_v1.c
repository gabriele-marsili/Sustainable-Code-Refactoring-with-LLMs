#include "meetup.h"
#include <time.h>
#include <stdlib.h>
#include <string.h>

static const char* weekdays[] = {"Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"};
static const char* weeks[] = {"first", "second", "third", "fourth", "fifth", "teenth", "last"};
static const int week_start_days[] = {1, 8, 15, 22, 29, 13, 0};

int weekday_in_week(const struct tm start, int month, int weekday, int diff) {
    struct tm day = start;
    int days_checked = 0;
    
    while (days_checked < 7 && day.tm_mon == month - 1) {
        if (day.tm_wday == weekday)
            return day.tm_mday;
        day.tm_mday += diff;
        mktime(&day);
        days_checked++;
    }
    return 0;
}

int weekday_to_int(const char *weekday) {
    for (int i = 0; i < 7; i++) {
        if (weekdays[i][0] == weekday[0] && strcmp(weekdays[i], weekday) == 0)
            return i;
    }
    return -1;
}

int meetupDayOfMonth(int year, int month, const char* week, const char* dayOfWeek) {
    int weekday = weekday_to_int(dayOfWeek);
    if (weekday == -1) return -1;
    
    struct tm date = {
        .tm_sec = 0, .tm_min = 0, .tm_hour = 0,
        .tm_year = year, .tm_mon = month - 1, .tm_mday = 1
    };
    
    int diff = 1;
    int week_idx = -1;
    
    // Find week index with first character optimization
    for (int i = 0; i < 7; i++) {
        if (weeks[i][0] == week[0] && strcmp(weeks[i], week) == 0) {
            week_idx = i;
            break;
        }
    }
    
    if (week_idx == -1) return -1;
    
    if (week_idx == 6) { // "last"
        date.tm_mon++;
        date.tm_mday = 0;
        diff = -1;
    } else {
        date.tm_mday = week_start_days[week_idx];
    }
    
    mktime(&date);
    return weekday_in_week(date, month, weekday, diff);
}