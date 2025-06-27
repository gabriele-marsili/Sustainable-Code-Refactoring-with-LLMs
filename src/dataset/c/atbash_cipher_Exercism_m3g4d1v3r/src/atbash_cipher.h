#ifndef ATBASH_CIPHER_H
#define ATBASH_CIPHER_H

#define GROUPS_LEN 5
#define MAX_OUTPUT 1000
#define ALPHABET_SIZE 'z' - 'a' + 1

#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

bool is_digit(const char chr);
bool is_uppercase(const char chr);
bool is_lowercase(const char chr);
int modulus(int a, int b);
char *atbash_encode(const char *input);
char *atbash_decode(const char *input);

#endif
