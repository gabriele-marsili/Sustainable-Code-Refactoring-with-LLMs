#ifndef PHONE_NUMBER_H
#define PHONE_NUMBER_H

#define MAX_NBS 10

#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>
#include <string.h>

bool check_n_digit(char input);
bool is_digit(char input);
void set_array_to_zero(char *array, size_t length);
char *phone_number_clean(const char *input);

#endif
