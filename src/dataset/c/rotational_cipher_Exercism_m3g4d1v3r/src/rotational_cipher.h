#ifndef ROTATIONAL_CIPHER_H
#define ROTATIONAL_CIPHER_H

#define ALPHABET_SIZE ('z' - 'a' + 1)

#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *rotate(const char *text, int shift_key);
int mod(int a, int b);

#endif
