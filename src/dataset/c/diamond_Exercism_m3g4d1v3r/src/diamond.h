#ifndef DIAMOND_H
#define DIAMOND_H

#include <math.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>

char **make_diamond(const char letter);
void free_diamond(char **diamond);

#endif
