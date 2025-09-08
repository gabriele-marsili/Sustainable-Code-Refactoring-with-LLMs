#include "meetup.h"
#include <string.h>

static const char* days[] = {
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
};

static inline int is_leap(const int year) {
	return ((year & 3) == 0 && year % 100 != 0) || year % 400 == 0;
}

static int get_week_day_num(const char* day) {
	for (int i = 0; i < 7; i++) {
		if (strcmp(days[i], day) == 0)
			return i;
	}
	return -1;
}

static inline int get_week_day(int d, const int m, int y) {
	return (d+=m<3?y--:y-2,23*m/9+d+4+y/4-y/100+y/400)%7;
}

static inline int get_first_day(const int year, const int month) {
	return get_week_day(1, month, year);
}

static int parse_modif(const char *modif) {
	switch (modif[0]) {
		case 'f':
			if (modif[1] == 'i') return 1; // "first"
			return 5; // "fifth"
		case 's': return 2; // "second"
		case 't': 
			if (modif[1] == 'h') return 3; // "third"
			return -2; // "teenth"
		case 'f': return 4; // "fourth"
		case 'l': return -3; // "last"
		default: return -1;
	}
}

int meetup_day_of_month(const int year, const int month, const char *modif,
		const char *day) {
	if ((month < 1) || (month > 12))
		return 0;

	int day_num = get_week_day_num(day);
	if (day_num == -1)
		return 0;

	static const int months[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
	int days_in_month = months[month - 1];
	if (month == 2 && is_leap(year))
		days_in_month = 29;

	int first_weekday = get_first_day(year, month);
	int target_modifier = parse_modif(modif);

	// Handle "teenth" case
	if (target_modifier == -2) {
		for (int date = 13; date <= 19; date++) {
			int weekday = (first_weekday + date - 1) % 7;
			if (weekday == day_num)
				return date;
		}
		return 0;
	}

	// Handle "last" case
	if (target_modifier == -3) {
		for (int date = days_in_month; date >= 1; date--) {
			int weekday = (first_weekday + date - 1) % 7;
			if (weekday == day_num)
				return date;
		}
		return 0;
	}

	// Handle ordinal cases (first, second, third, fourth, fifth)
	int count = 0;
	for (int date = 1; date <= days_in_month; date++) {
		int weekday = (first_weekday + date - 1) % 7;
		if (weekday == day_num) {
			count++;
			if (count == target_modifier)
				return date;
		}
	}
	return 0;
}