#include "bob.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

void chomp(char *str) {
    for(char *p = str + strlen(str) - 1; str <= p && *p == ' '; p--) {
        *p = '\0';
    }
}

int count(char *str, int (*test)(char)) {
    int count = 0;
    for(int i = 0; str[i]; i++) { if(test(str[i])) count++; }
    return count;
}

int upper(char c) { return 'A' <= c && c <= 'Z'; }
int lower(char c) { return 'a' <= c && c <= 'z'; }
char last_char(char *str) { return str[strlen(str) - 1]; }

char *hey_bob(char *str) {
    size_t original_len = strlen(str);
    char *greeting = malloc(original_len + 1);
    strcpy(greeting, str);

    chomp(greeting);

    size_t chomped_len = strlen(greeting);

    if (chomped_len == 0) {
        free(greeting);
        return "Fine. Be that way!";
    }

    int num_upper = 0;
    bool found_lower = false;
    for (size_t i = 0; i < chomped_len; i++) {
        char c = greeting[i];
        if (upper(c)) {
            num_upper++;
        } else if (lower(c)) {
            found_lower = true;
        }
    }

    if (!found_lower && num_upper > 1) {
        free(greeting);
        return "Whoa, chill out!";
    }

    if (greeting[chomped_len - 1] == '?') {
        free(greeting);
        return "Sure.";
    }

    free(greeting);
    return "Whatever.";
}