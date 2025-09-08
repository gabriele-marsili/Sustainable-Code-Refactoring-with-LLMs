#include "meetup.h"
#include <time.h>
#include <stdlib.h>
#include <string.h>

static const char* const weekdays[] = {
    "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
};

static const char* const weeks[] = {
    "first", "second", "third", "fourth", "fifth", "teenth", "last"
};

static const int week_start_days[] = { 1, 8, 15, 22, 29, 13, 0 };

int weekday_in_week(const struct tm start, int month, int weekday, int diff) {
    struct tm day = start;
    const int max_iterations = 7;
    
    for(int i = 0; i < max_iterations && month - 1 == day.tm_mon; i++) {
        mktime(&day);
        if(day.tm_wday == weekday)
            return day.tm_mday;
        day.tm_mday += diff;
    }
    return 0;
}

int weekday_to_int(const char *weekday) {
    for(int i = 0; i < 7; i++) {
        if(weekdays[i][0] == weekday[0] && strcmp(weekdays[i], weekday) == 0)
            return i;
    }
    return -1;
}

int meetupDayOfMonth(int year, int month, const char* week, const char* dayOfWeek) {
    int weekday = weekday_to_int(dayOfWeek);
    if(weekday == -1) return -1;
    
    int week_index = -1;
    for(int i = 0; i < 7; i++) {
        if(weeks[i][0] == week[0] && strcmp(weeks[i], week) == 0) {
            week_index = i;
            break;
        }
    }
    if(week_index == -1) return -1;
    
    struct tm date = {
        .tm_sec = 0, .tm_min = 0, .tm_hour = 0,
        .tm_year = year, .tm_mon = month - 1,
        .tm_mday = week_start_days[week_index]
    };
    
    int diff = 1;
    if(week_index == 6) {
        date.tm_mon++;
        diff = -1;
    }
    
    mktime(&date);
    return weekday_in_week(date, month, weekday, diff);
}