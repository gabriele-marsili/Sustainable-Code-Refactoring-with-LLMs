#include "clock.h"
#include <stdio.h>
#include <stdlib.h>

void clock(time_text_t time_text, int hour, int minute)
{
	if (time_text == NULL)
		return;

	int total_minutes = hour * 60 + minute;
	total_minutes = ((total_minutes % 1440) + 1440) % 1440;
	
	int ch = total_minutes / 60;
	int cm = total_minutes % 60;

	sprintf(time_text, "%02d:%02d", ch, cm);
}

void clock_add(time_text_t time_text, int minute_offset)
{
	if (time_text == NULL)
		return;

	int hour = (time_text[0] - '0') * 10 + (time_text[1] - '0');
	int minute = (time_text[3] - '0') * 10 + (time_text[4] - '0');

	clock(time_text, hour, minute + minute_offset);
}