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
static int curr_month[MAXWEEKS][MAXDAYS];

static inline int is_leap(const int year) {
	return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0);
}

static inline int get_week_day_num(const char* day) {
	for (int i = 0; i < 7; i++) {
		if (strcmp(days[i], day) == 0)
			return i;
	}
	return -1;
}

static inline int get_week_day(int d, const int m, int y) {
	return (d += m < 3 ? y-- : y - 2, 23 * m / 9 + d + 4 + y / 4 - y / 100 + y / 400) % 7;
}

static inline int get_first_day(const int year, const int month) {
	return get_week_day(1, month, year);
}

static void construct_month(const int year, const int month) {
	memset(curr_month, 0, sizeof(curr_month));
	static const int months[] = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
	int days_in_month = months[month - 1] + (month == 2 && is_leap(year));
	int week_day = get_first_day(year, month);
	int week = 0;

	for (int date = 1; date <= days_in_month; date++) {
		curr_month[week][week_day] = date;
		if (++week_day == MAXDAYS) {
			week_day = 0;
			week++;
		}
	}
}

static inline int parse_modif(const char *modif) {
	switch (modif[0]) {
		case 'f': return (modif[1] == 'i') ? 1 : 4; // "first" or "fourth"
		case 's': return 2; // "second"
		case 't': return 3; // "third"
		case 'l': return 5; // "fifth"
		default: return -1;
	}
}

int meetup_day_of_month(const int year, const int month, const char *modif, const char *day) {
	if (month < 1 || month > 12)
		return 0;

	int day_num = get_week_day_num(day);
	if (day_num == -1)
		return 0;

	construct_month(year, month);

	if (strcmp("teenth", modif) == 0) {
		for (int i = 1; i < MAXWEEKS; i++) {
			if (curr_month[i][day_num] >= 13 && curr_month[i][day_num] <= 19)
				return curr_month[i][day_num];
		}
		return 0;
	}

	if (strcmp("last", modif) == 0) {
		for (int i = MAXWEEKS - 1; i >= 0; i--) {
			if (curr_month[i][day_num] > 0)
				return curr_month[i][day_num];
		}
		return 0;
	}

	int target = parse_modif(modif);
	if (target == -1)
		return 0;

	int count = 0;
	for (int i = 0; i < MAXWEEKS; i++) {
		if (curr_month[i][day_num] > 0 && ++count == target)
			return curr_month[i][day_num];
	}
	return 0;
}