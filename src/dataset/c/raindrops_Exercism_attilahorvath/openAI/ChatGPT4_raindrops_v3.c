#include "raindrops.h"
#include <stdio.h>

const char *convert(char *buffer, size_t buffer_length, int number) {
    size_t pos = 0;
    if (number % 3 == 0) pos += snprintf(buffer + pos, buffer_length > pos ? buffer_length - pos : 0, "Pling");
    if (number % 5 == 0) pos += snprintf(buffer + pos, buffer_length > pos ? buffer_length - pos : 0, "Plang");
    if (number % 7 == 0) pos += snprintf(buffer + pos, buffer_length > pos ? buffer_length - pos : 0, "Plong");
    if (pos == 0) snprintf(buffer, buffer_length, "%d", number);
    return buffer;
}
