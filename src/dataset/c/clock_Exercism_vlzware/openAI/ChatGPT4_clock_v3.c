#include "clock.h"
#include <stdio.h>
#include <stdlib.h>

void clock(time_text_t time_text, int hour, int minute)
{
	if (!time_text)
		return;

	minute += hour * 60;
	minute = (minute % 1440 + 1440) % 1440; // Normalize to range [0, 1439]

	int ch = minute / 60;
	int cm = minute % 60;

	snprintf(time_text, 6, "%02d:%02d", ch, cm);
}

void clock_add(time_text_t time_text, int minute_offset)
{
	if (!time_text)
		return;

	int hour = (time_text[0] - '0') * 10 + (time_text[1] - '0');
	int minute = (time_text[3] - '0') * 10 + (time_text[4] - '0');

	clock(time_text, hour, minute + minute_offset);
}