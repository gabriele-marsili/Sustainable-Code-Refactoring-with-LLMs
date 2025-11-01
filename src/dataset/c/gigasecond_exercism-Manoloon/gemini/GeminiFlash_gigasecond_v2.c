#include "gigasecond.h"
#include <time.h>

void gigasecond(time_t input, char *output, size_t size) {
  time_t gigasecond_later = input + 1000000000;
  struct tm *timeinfo = localtime(&gigasecond_later);

  if (timeinfo != NULL) {
    strftime(output, size, "%Y-%m-%d %H:%M:%S", timeinfo);
  } else {
    // Handle error if localtime fails.  A reasonable default:
    snprintf(output, size, "1970-01-01 00:00:00"); // Or some other default
  }
}