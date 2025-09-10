#include "wordy.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

int str_is_numeric(char *str) {
    if (*str == '+' || *str == '-') str++;
    while (*str) {
        if (!isdigit(*str)) return 0;
        str++;
    }
    return 1;
}

int count_words(const char *str) {
    int count = 0;
    while (*str) {
        if (*str == ' ') count++;
        str++;
    }
    return count + 1;
}

bool is_valid_question(const char *str) {
    return strncmp(str, "What is ", 8) == 0;
}

bool is_valid_operator(const char *str) {
    return strcmp(str, "plus") == 0 || strcmp(str, "minus") == 0 ||
           strcmp(str, "by") == 0 || strcmp(str, "multiplied") == 0 ||
           strcmp(str, "divided") == 0;
}

bool answer(const char *question, int *result) {
    if (!is_valid_question(question)) return false;

    size_t len = strlen(question);
    char temp_question[len + 1];
    strcpy(temp_question, question);

    if (temp_question[len - 1] == '?') temp_question[len - 1] = '\0';

    int size = count_words(temp_question);
    char *tokens[size];
    int i = 0;

    char *token = strtok(temp_question, " ");
    while (token) {
        tokens[i++] = token;
        token = strtok(NULL, " ");
    }

    if (i < 3 || !str_is_numeric(tokens[2])) return false;
    *result = atoi(tokens[2]);

    for (int index = 3; index < i; index++) {
        if (str_is_numeric(tokens[index])) {
            if (!is_valid_operator(tokens[index - 1])) return false;
            int temp_number = atoi(tokens[index]);
            if (strcmp(tokens[index - 1], "plus") == 0) {
                *result += temp_number;
            } else if (strcmp(tokens[index - 1], "minus") == 0) {
                *result -= temp_number;
            } else if (strcmp(tokens[index - 1], "multiplied") == 0 && index > 2 && strcmp(tokens[index - 2], "by") == 0) {
                *result *= temp_number;
            } else if (strcmp(tokens[index - 1], "divided") == 0 && index > 2 && strcmp(tokens[index - 2], "by") == 0) {
                if (temp_number == 0) return false;
                *result /= temp_number;
            } else {
                return false;
            }
        } else if (!is_valid_operator(tokens[index])) {
            return false;
        }
    }

    return true;
}