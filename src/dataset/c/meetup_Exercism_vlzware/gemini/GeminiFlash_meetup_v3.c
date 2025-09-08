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

int is_leap(const int year);
int get_week_day_num(const char* day);
int get_first_day(const int year, const int month);

/*
	Accepted modifiers:
	"first", "second", "third", "fourth", "fifth",
	"last" and "teenth" (meaning 13 <= "teenth" <= 19)

	month is 1..12
*/
int meetup_day_of_month(const int year, const int month, const char *modif,
		const char *day)
{
	if ((month < 1) || (month > 12))
		return 0;

	int day_num = get_week_day_num(day);
	if (day_num == -1)
		return 0;

	int first_day_of_month = get_first_day(year, month);
	int days_in_month[] = {31, (is_leap(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
	int dom = 0;

	if (strcmp("teenth", modif) == 0) {
		int day_count = 0;
		for (int d = 13; d <= 19; ++d) {
			if ((first_day_of_month + (d - 1)) % 7 == day_num) {
				return d;
			}
		}
		return 0;
	} else if (strcmp("last", modif) == 0) {
		int last_day = days_in_month[month - 1];
		for (int d = last_day; d >= 1; --d) {
			if ((first_day_of_month + (d - 1)) % 7 == day_num) {
				return d;
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

		int count = 0;
		for (int d = 1; d <= days_in_month[month - 1]; ++d) {
			if ((first_day_of_month + (d - 1)) % 7 == day_num) {
				count++;
				if (count == target) {
					return d;
				}
			}
		}
		return 0;
	}
}

int is_leap(const int year)
{
	return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0);
}

int get_week_day_num(const char* day)
{
	for (int i = 0; i < 7; i++) {
		if (days[i][0] == day[0] && strcmp(days[i], day) == 0)
			return i;
	}
	return -1;
}

/* https://en.wikipedia.org/wiki/Determination_of_the_day_of_the_week\
	#Implementation-dependent_methods */
int get_first_day(const int year, const int month)
{
	int m = month;
	int y = year;
	int d = 1;
	return (d+=m<3?y--:y-2,23*m/9+d+4+y/4-y/100+y/400)%7;
}