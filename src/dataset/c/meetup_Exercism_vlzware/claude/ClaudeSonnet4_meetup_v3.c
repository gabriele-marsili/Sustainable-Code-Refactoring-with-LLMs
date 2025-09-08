#include "meetup.h"
#include <string.h>

static const char* const days[] = {
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
};

static const int days_in_month[] = {
	31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
};

int is_leap(const int year);
int get_week_day_num(const char* day);
int get_week_day(const int day, const int month, int year);
int get_first_day(const int year, const int month);
int parse_modif(const char *modif);

int meetup_day_of_month(const int year, const int month, const char *modif,
		const char *day)
{
	if ((month < 1) || (month > 12))
		return 0;

	int day_num = get_week_day_num(day);
	if (day_num == -1)
		return 0;

	int days_count = days_in_month[month - 1];
	if (month == 2 && is_leap(year))
		days_count = 29;

	int first_weekday = get_first_day(year, month);
	
	if (strcmp("teenth", modif) == 0) {
		for (int date = 13; date <= 19 && date <= days_count; date++) {
			int weekday = (first_weekday + date - 1) % 7;
			if (weekday == day_num)
				return date;
		}
		return 0;
	}

	if (strcmp("last", modif) == 0) {
		for (int date = days_count; date >= 1; date--) {
			int weekday = (first_weekday + date - 1) % 7;
			if (weekday == day_num)
				return date;
		}
		return 0;
	}

	int target = parse_modif(modif);
	if (target == -1)
		return 0;

	int count = 0;
	for (int date = 1; date <= days_count; date++) {
		int weekday = (first_weekday + date - 1) % 7;
		if (weekday == day_num) {
			if (++count == target)
				return date;
		}
	}
	return 0;
}

int is_leap(const int year)
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

int get_week_day(int d, const int m, int y)
{
	return (d+=m<3?y--:y-2,23*m/9+d+4+y/4-y/100+y/400)%7;
}

int get_first_day(const int year, const int month)
{
	return get_week_day(1, month, year);
}

int parse_modif(const char *modif)
{
	switch (modif[0]) {
		case 'f':
			if (strcmp("first", modif) == 0) return 1;
			if (strcmp("fourth", modif) == 0) return 4;
			if (strcmp("fifth", modif) == 0) return 5;
			break;
		case 's':
			if (strcmp("second", modif) == 0) return 2;
			break;
		case 't':
			if (strcmp("third", modif) == 0) return 3;
			break;
	}
	return -1;
}