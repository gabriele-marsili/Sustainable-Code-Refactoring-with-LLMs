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
int meetup_day_of_month(int year, int month, const char *modif, const char *day);

/*
	Accepted modifiers:
	"first", "second", "third", "fourth", "fifth",
	"last" and "teenth" (meaning 13 <= "teenth" <= 19)

	month is 1..12
*/
int meetup_day_of_month(int year, int month, const char *modif,
		const char *day)
{
	if ((month < 1) || (month > 12))
		return 0;

	int day_num = get_week_day_num(day);
	if (day_num == -1)
		return 0;

	int first_day_of_month = get_first_day(year, month);
	int day_count = 0;
	int target_day = 0;

	int days_in_month[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
	if (is_leap(year)) {
		days_in_month[1] = 29;
	}

	if (strcmp("teenth", modif) == 0) {
		for (int day = 13; day <= 19; ++day) {
			if ((first_day_of_month + day - 1) % 7 == day_num) {
				return day;
			}
		}
		return 0;
	} else if (strcmp("last", modif) == 0) {
		int last_day = days_in_month[month - 1];
		for (int day = last_day; day >= 1; --day) {
			if ((first_day_of_month + day - 1) % 7 == day_num) {
				return day;
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

		for (int day = 1; day <= days_in_month[month - 1]; ++day) {
			if ((first_day_of_month + day - 1) % 7 == day_num) {
				day_count++;
				if (day_count == target) {
					return day;
				}
			}
		}
		return 0;
	}
}

int is_leap(int year)
{
	return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0);
}

int get_week_day_num(const char* day)
{
	for (int i = 0; i < 7; i++) {
		if (strcmp(days[i], day) == 0)
			return i;
	}
	return -1;
}

int get_first_day(int year, int month) {
    // Zeller's Congruence (more efficient calculation)
    int q = 1; // Day of the month
    int m = month;
    int Y = year;
    if (m < 3) {
        m += 12;
        Y--;
    }
    int K = Y % 100;
    int J = Y / 100;
    int h = (q + (13 * (m + 1)) / 5 + K + K / 4 + J / 4 + 5 * J) % 7;
    return (h + 6) % 7; // Adjust to return 0 for Sunday, 1 for Monday, etc.
}