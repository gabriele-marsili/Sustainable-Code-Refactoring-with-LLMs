#include "meetup.h"
#include <string.h>
#include <stdbool.h>

const char* days[] = {
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
};

#define MAXWEEKS 6
#define MAXDAYS 7

int is_leap(int year);
int get_week_day_num(const char* day);
int get_first_day(int year, int month);

/*
	Accepted modifiers:
	"first", "second", "third", "fourth", "fifth",
	"last" and "teenth" (meaning 13 <= "teenth" <= 19)

	month is 1..12
*/
int meetup_day_of_month(int year, int month, const char *modif, const char *day) {
    if (month < 1 || month > 12) {
        return 0;
    }

    int day_num = get_week_day_num(day);
    if (day_num == -1) {
        return 0;
    }

    int first_day_of_month = get_first_day(year, month);
    int day_count = 0;
    int target_day = 0;

    if (strcmp("teenth", modif) == 0) {
        for (int day_of_month = 13; day_of_month <= 19; ++day_of_month) {
            if ((first_day_of_month + day_of_month - 1) % 7 == day_num) {
                return day_of_month;
            }
        }
        return 0;
    } else if (strcmp("last", modif) == 0) {
        int days_in_month = 31;
        if (month == 2) {
            days_in_month = is_leap(year) ? 29 : 28;
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
            days_in_month = 30;
        }

        for (int day_of_month = days_in_month; day_of_month >= 1; --day_of_month) {
            if ((first_day_of_month + day_of_month - 1) % 7 == day_num) {
                return day_of_month;
            }
        }
        return 0;
    } else {
        int target = 0;
        if (strcmp("first", modif) == 0) target = 1;
        else if (strcmp("second", modif) == 0) target = 2;
        else if (strcmp("third", modif) == 0) target = 3;
        else if (strcmp("fourth", modif) == 0) target = 4;
        else if (strcmp("fifth", modif) == 0) target = 5;
        else return 0;

        for (int day_of_month = 1; day_of_month <= 31; ++day_of_month) {
            if ((first_day_of_month + day_of_month - 1) % 7 == day_num) {
                day_count++;
                if (day_count == target) {
                    return day_of_month;
                }
            }
        }
        return 0;
    }
}

int is_leap(int year) {
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

int get_week_day_num(const char* day) {
    for (int i = 0; i < 7; ++i) {
        if (strcmp(days[i], day) == 0) {
            return i;
        }
    }
    return -1;
}

int get_first_day(int year, int month) {
    int day = 1;
    int y = year;
    int m = month;
    day += m < 3 ? y-- : y - 2;
    return (day + 23 * m / 9 + 4 + y / 4 - y / 100 + y / 400) % 7;
}