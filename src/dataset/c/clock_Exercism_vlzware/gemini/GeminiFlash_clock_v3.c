#include "clock.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <inttypes.h>

void clock(time_text_t time_text, int hour, int minute)
{
	if (time_text == NULL)
		return;

	int32_t total_minutes = (int32_t)hour * 60 + (int32_t)minute;

	total_minutes %= (24 * 60);

	if (total_minutes < 0) {
		total_minutes += (24 * 60);
	}

	int32_t h = total_minutes / 60;
	int32_t m = total_minutes % 60;

	sprintf(time_text, "%02" PRId32 ":%02" PRId32, h, m);
}

void clock_add(time_text_t time_text, int minute_offset)
{
	if (time_text == NULL)
		return;

	int hour = 0;
	int minute = 0;

	if (sscanf(time_text, "%d:%d", &hour, &minute) != 2) {
		return;
	}

	clock(time_text, hour, minute + minute_offset);
}