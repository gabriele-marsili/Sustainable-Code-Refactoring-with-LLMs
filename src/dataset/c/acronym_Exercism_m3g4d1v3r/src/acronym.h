#ifndef ACRONYM_H
#define ACRONYM_H

#include <ctype.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>
#include <string.h>

bool is_a_separator(char chr);
bool is_a_letter(char chr);
char *abbreviate(const char *phrase);

#endif
