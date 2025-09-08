#include "meetup.h"
#include <string.h>

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
int curr_month[MAXWEEKS][MAXDAYS];

int is_leap(const int year);
int get_week_day_num(const char* day);
int get_week_day(const int day, const int month, int year);
int get_first_day(const int year, const int month);
void construct_month(const int year, const int month, int *months);
int parse_modif(const char *modif);

int meetup_day_of_month(const int year, const int month, const char *modif,
		const char *day)
{
	if ((month < 1) || (month > 12))
		return 0;

	int day_num = get_week_day_num(day);
	if (day_num == -1)
		return 0;

	int months[12] = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
	if (is_leap(year))
		months[1] = 29;

	construct_month(year, month, months);

	if (strcmp("teenth", modif) == 0) {
		for (int i = 1; i <= 7; i++) {
			int date = 12 + i;
			if (get_week_day(date, month, year) == day_num)
				return date;
		}
		return 0;
	}

	if (strcmp("last", modif) == 0) {
		for (int date = months[month - 1]; date > 0; date--) {
			if (get_week_day(date, month, year) == day_num)
				return date;
		}
		return 0;
	}

	int target = parse_modif(modif);
	if (target == -1)
		return 0;

	int count = 0;
	for (int date = 1; date <= months[month - 1]; date++) {
		if (get_week_day(date, month, year) == day_num) {
			count++;
			if (count == target)
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
	return (d += m < 3 ? y-- : y - 2, 23 * m / 9 + d + 4 + y / 4 - y / 100 + y / 400) % 7;
}

int get_first_day(const int year, const int month)
{
	return get_week_day(1, month, year);
}

void construct_month(const int year, const int month, int *months)
{
	memset(curr_month, 0, sizeof(curr_month));

	int week_day = get_first_day(year, month);
	int week = 0;

	for (int date = 1; date <= months[month - 1]; date++) {
		curr_month[week][week_day] = date;
		if (++week_day == MAXDAYS) {
			week_day = 0;
			week++;
		}
	}
}

int parse_modif(const char *modif)
{
	switch (modif[0]) {
		case 'f': return 1;
		case 's': return 2;
		case 't': return (modif[1] == 'h') ? 3 : -1;
		case 'l': return 4;
		case 'f': return 5;
		default: return -1;
	}
}