#include "meetup.h"
#include <time.h>
#include <stdlib.h>
#include <string.h>

// Precomputed weekday lookup table
static const int weekday_map[] = {
    ['S' + 'a' + 't'] = 0, // Saturday
    ['S' + 'u' + 'n'] = 1, // Sunday
    ['M' + 'o' + 'n'] = 2, // Monday
    ['T' + 'u' + 'e'] = 3, // Tuesday
    ['W' + 'e' + 'd'] = 4, // Wednesday
    ['T' + 'h' + 'u'] = 5, // Thursday
    ['F' + 'r' + 'i'] = 6  // Friday
};

int weekday_to_int(const char *weekday) {
    // Faster weekday lookup using precomputed table and first 3 chars
    if (weekday == NULL || weekday[0] == '\0' || weekday[1] == '\0' || weekday[2] == '\0') {
        return -1;
    }
    int index = weekday[0] + weekday[1] + weekday[2];
    if (index >= 0 && index < sizeof(weekday_map) / sizeof(weekday_map[0]) && weekday_map[index] >= 0) {
        // Additional check to confirm the full weekday string
        if ((weekday[0] == 'S' && ((weekday[1] == 'a' && weekday[2] == 't' && strcmp(weekday, "Saturday") == 0) || (weekday[1] == 'u' && weekday[2] == 'n' && strcmp(weekday, "Sunday") == 0))) ||
            (weekday[0] == 'M' && weekday[1] == 'o' && weekday[2] == 'n' && strcmp(weekday, "Monday") == 0) ||
            (weekday[0] == 'T' && ((weekday[1] == 'u' && weekday[2] == 'e' && strcmp(weekday, "Tuesday") == 0) || (weekday[1] == 'h' && weekday[2] == 'u' && strcmp(weekday, "Thursday") == 0))) ||
            (weekday[0] == 'W' && weekday[1] == 'e' && weekday[2] == 'd' && strcmp(weekday, "Wednesday") == 0) ||
            (weekday[0] == 'F' && weekday[1] == 'r' && weekday[2] == 'i' && strcmp(weekday, "Friday") == 0))
        {
            return weekday_map[index];
        }
    }
    return -1;
}

int weekday_in_week(int year, int month, int weekday, int start_day, int diff) {
    struct tm day = { .tm_year = year - 1900, .tm_mon = month - 1, .tm_mday = start_day, .tm_hour = 12 }; // Set hour to avoid DST issues
    mktime(&day); // Normalize the date

    for (int i = 0; i < 7; ++i) {
        if (day.tm_wday == weekday && day.tm_mon == month - 1) {
            return day.tm_mday;
        }
        day.tm_mday += diff;
        mktime(&day); // Normalize after incrementing
    }

    return 0; // No date found
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
        // Calculate the last day of the month
        struct tm t = { .tm_year = year - 1900, .tm_mon = month, .tm_mday = 1, .tm_hour = 12 }; // Month is 0-indexed
        mktime(&t);
        t.tm_mday = 0; // Set to the last day of the previous month
        mktime(&t);
        start_day = t.tm_mday;
        diff = -1;
    } else {
        return -1; // Invalid week
    }

    return weekday_in_week(year, month, weekday, start_day, diff);
}