#include "gigasecond.h"
#include <stdio.h>
#include <time.h>

void gigasecond(time_t input, char *output, size_t size) {
  time_t gigasecond_later = input + 1000000000;
  struct tm *timeinfo = localtime(&gigasecond_later);

  if (timeinfo != NULL && size > 0) {
    strftime(output, size, "%Y-%m-%d %H:%M:%S", timeinfo);
  } else if (size > 0) {
    output[0] = '\0';
  }
}