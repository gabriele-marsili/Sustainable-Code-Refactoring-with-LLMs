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

int count(char *str, int (*test)(char)) {
    int cnt = 0;
    for (; *str; str++) {
        cnt += test(*str) ? 1 : 0;
    }
    return cnt;
}

int upper(char c) { return c >= 'A' && c <= 'Z'; }
int lower(char c) { return c >= 'a' && c <= 'z'; }

char last_char(char *str) {
    size_t len = strlen(str);
    return len ? str[len - 1] : '\0';
}

char *hey_bob(char *str) {
    size_t len = strlen(str);
    char *greeting = malloc(len + 1);
    if (!greeting) return "Whatever.";
    memcpy(greeting, str, len + 1);
    chomp(greeting);

    if (greeting[0] == '\0') {
        free(greeting);
        return "Fine. Be that way!";
    }

    int has_upper = 0, has_lower = 0;
    for (char *p = greeting; *p; p++) {
        if (upper(*p)) has_upper = 1;
        else if (lower(*p)) has_lower = 1;
        if (has_upper && has_lower) break;
    }

    char response[32];
    if (has_upper && !has_lower) {
        strcpy(response, "Whoa, chill out!");
    } else if (last_char(greeting) == '?') {
        strcpy(response, "Sure.");
    } else {
        strcpy(response, "Whatever.");
    }

    free(greeting);
    return strdup(response);
}