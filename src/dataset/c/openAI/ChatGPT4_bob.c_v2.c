#include "bob.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

void chomp(char *str) {
    size_t len = strlen(str);
    while (len > 0 && str[len - 1] == ' ') {
        str[--len] = '\0';
    }
}

char *hey_bob(char *str) {
    size_t len = strlen(str);
    while (len > 0 && str[len - 1] == ' ') {
        len--;
    }

    if (len == 0) return "Fine. Be that way!";

    int has_upper = 0, has_lower = 0;
    for (size_t i = 0; i < len; i++) {
        if (isupper((unsigned char)str[i])) has_upper = 1;
        else if (islower((unsigned char)str[i])) has_lower = 1;
    }

    if (has_upper && !has_lower) return "Whoa, chill out!";
    if (str[len - 1] == '?') return "Sure.";
    return "Whatever.";
}