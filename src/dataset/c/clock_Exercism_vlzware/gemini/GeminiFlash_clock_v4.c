#include "clock.h"
#include <stdio.h>

void clock(time_text_t time_text, int hour, int minute) {
  if (time_text == NULL) return;

  hour = hour % 24;
  minute = minute % 60;

  if (minute < 0) {
    minute += 60;
    hour--;
  }

  hour += minute / 60;
  minute %= 60;

  hour %= 24;
  if (hour < 0) {
    hour += 24;
  }

  if (minute < 0) {
    minute += 60;
    hour--;
    if (hour < 0) {
      hour += 24;
    }
  }

  sprintf(time_text, "%02d:%02d", hour, minute);
}

void clock_add(time_text_t time_text, int minute_offset) {
  if (time_text == NULL) return;

  int hour = (time_text[0] - '0') * 10 + (time_text[1] - '0');
  int minute = (time_text[3] - '0') * 10 + (time_text[4] - '0');

  clock(time_text, hour, minute + minute_offset);
}