#include "bob.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void chomp(char *str) {
    int len = strlen(str);
    if (len == 0) return;
    
    char *p = str + len - 1;
    while (p >= str && *p == ' ') {
        *p = '\0';
        p--;
    }
}

int count(char *str, int (*test)(char)) {
    int count = 0;
    for (char *p = str; *p; p++) {
        if (test(*p)) count++;
    }
    return count;
}

int upper(char c) { return 'A' <= c && c <= 'Z'; }
int lower(char c) { return 'a' <= c && c <= 'z'; }
char last_char(char *str) { return str[strlen(str) - 1]; }

char *hey_bob(char *str) {
    int len = strlen(str);
    if (len == 0) return "Fine. Be that way!";
    
    char *greeting = malloc(len + 1);
    strcpy(greeting, str);
    chomp(greeting);
    
    if (*greeting == '\0') {
        free(greeting);
        return "Fine. Be that way!";
    }
    
    int has_upper = 0;
    int has_lower = 0;
    char last = '\0';
    
    for (char *p = greeting; *p; p++) {
        if (!has_upper && upper(*p)) has_upper = 1;
        if (!has_lower && lower(*p)) has_lower = 1;
        last = *p;
    }
    
    free(greeting);
    
    if (!has_lower && has_upper) return "Whoa, chill out!";
    if (last == '?') return "Sure.";
    return "Whatever.";
}