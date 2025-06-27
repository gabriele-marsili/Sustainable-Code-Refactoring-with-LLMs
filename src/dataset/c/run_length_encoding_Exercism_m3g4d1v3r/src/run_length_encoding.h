#ifndef RUN_LENGTH_ENCODING_H
#define RUN_LENGTH_ENCODING_H

#include <math.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

bool is_digit(char chr);
char *encode(const char *text);
char *decode(const char *data);

#endif
