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
int parse_modif(const char *modif);

/*
	Accepted modifiers:
	"first", "second", "third", "fourth", "fifth",
	"last" and "teenth" (meaning 13 <= "teenth" <= 19)

	month is 1..12
*/
int meetup_day_of_month(int year, int month, const char *modif, const char *day)
{
	if ((month < 1) || (month > 12))
		return 0;

	int day_num = get_week_day_num(day);
	if (day_num == -1)
		return 0;

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
		int days_in_month[] = {31, is_leap(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
		int last_day_of_month = days_in_month[month - 1];

		for (int day_of_month = last_day_of_month; day_of_month >= last_day_of_month - 6; --day_of_month) {
			if ((first_day_of_month + day_of_month - 1) % 7 == day_num) {
				return day_of_month;
			}
		}
		return 0;
	} else {
		int target = parse_modif(modif);
		if (target == -1) return 0;

		int days_in_month[] = {31, is_leap(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
		int last_day_of_month = days_in_month[month - 1];

		for (int day_of_month = 1; day_of_month <= last_day_of_month; ++day_of_month) {
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

int is_leap(int year)
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
int get_first_day(int year, int month)
{
	int m = (month + 10) % 12;
	int y = year - (month <= 2);
	return (1 + (13 * m - 1) / 5 + y + y / 4 - y / 100 + y / 400) % 7;
}

int parse_modif(const char *modif)
{
	if (modif[0] == 'f' && strcmp("first", modif) == 0) return 1;
	if (modif[0] == 's' && strcmp("second", modif) == 0) return 2;
	if (modif[0] == 't' && strcmp("third", modif) == 0) return 3;
	if (modif[0] == 'f' && strcmp("fourth", modif) == 0) return 4;
	if (modif[0] == 'f' && strcmp("fifth", modif) == 0) return 5;
	return -1;
}