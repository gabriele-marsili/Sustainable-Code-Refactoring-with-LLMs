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
	return (d += m < 3 ? y-- : y - 2, 23 * m / 9 + d + 4 + y / 4 - y / 100 + y / 400) % 7;
}

static inline int get_first_day(const int year, const int month) {
	return get_week_day(1, month, year);
}

static int parse_modif(const char *modif) {
	switch (modif[0]) {
		case 'f':
			if (modif[1] == 'i') return 1;
			if (modif[1] == 'o') return 4;
			if (modif[1] == 'i' && modif[2] == 'f') return 5;
			break;
		case 's': return 2;
		case 't': return 3;
	}
	return -1;
}

int meetup_day_of_month(const int year, const int month, const char *modif,
		const char *day) {
	if (month < 1 || month > 12)
		return 0;

	const int day_num = get_week_day_num(day);
	if (day_num == -1)
		return 0;

	const int month_days = days_in_month[month - 1] + (month == 2 && is_leap(year));
	const int first_weekday = get_first_day(year, month);
	
	if (strcmp("teenth", modif) == 0) {
		int start_day = 13 - first_weekday;
		if (start_day <= 0) start_day += 7;
		
		int target_day = start_day + ((day_num - first_weekday + 7) % 7);
		if (target_day < 13) target_day += 7;
		
		return (target_day <= 19 && target_day <= month_days) ? target_day : 0;
	}

	if (strcmp("last", modif) == 0) {
		int last_occurrence = month_days - ((first_weekday + month_days - 1 - day_num) % 7);
		return last_occurrence;
	}

	const int target = parse_modif(modif);
	if (target == -1) return 0;

	int first_occurrence = 1 + ((day_num - first_weekday + 7) % 7);
	int target_day = first_occurrence + (target - 1) * 7;
	
	return (target_day <= month_days) ? target_day : 0;
}