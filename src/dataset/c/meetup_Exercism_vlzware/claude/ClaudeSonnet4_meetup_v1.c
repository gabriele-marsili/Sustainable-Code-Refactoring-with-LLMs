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

static const int months_days[] = {
	31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
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
			if (modif[2] == 'f') return 5; // "fifth"
			return (modif[3] == 'r') ? 4 : -1; // "fourth"
		case 's':
			return (modif[1] == 'e') ? 2 : 3; // "second" : "third"
		default:
			return -1;
	}
}

int meetup_day_of_month(const int year, const int month, const char *modif,
		const char *day)
{
	if ((month < 1) || (month > 12))
		return 0;

	int day_num = get_week_day_num(day);
	if (day_num == -1)
		return 0;

	int days_in_month = months_days[month - 1];
	if (month == 2 && is_leap(year))
		days_in_month = 29;

	int first_weekday = get_first_day(year, month);
	
	// Calculate first occurrence of the target day
	int first_occurrence = 1 + ((day_num - first_weekday + 7) % 7);
	
	if (strcmp("teenth", modif) == 0) {
		// Find occurrence in 13-19 range
		int candidate = first_occurrence;
		while (candidate <= 19) {
			if (candidate >= 13)
				return candidate;
			candidate += 7;
		}
		return 0;
	}

	if (strcmp("last", modif) == 0) {
		// Find last occurrence
		int last_occurrence = first_occurrence;
		while (last_occurrence + 7 <= days_in_month) {
			last_occurrence += 7;
		}
		return last_occurrence;
	}

	int target = parse_modif(modif);
	if (target == -1)
		return 0;
		
	int occurrence = first_occurrence + (target - 1) * 7;
	return (occurrence <= days_in_month) ? occurrence : 0;
}