#ifndef LUHN_H
#define LUHN_H

#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>
#include <string.h>

bool luhn(const char *num);
bool input_is_valid(const char *num);

#endif
