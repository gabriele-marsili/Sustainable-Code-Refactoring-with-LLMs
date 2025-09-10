#include "wordy.h"
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

int str_is_numeric(const char *str) {
    if (*str == '+' || *str == '-')
        str++;
    while (*str) {
        if (!isdigit(*str))
            return 0;
        str++;
    }
    return 1;
}

bool is_valid_question(const char *str) {
    return strncmp(str, "What is ", 8) == 0;
}

bool is_valid_operator(const char *str) {
    return strcmp(str, "plus") == 0 || strcmp(str, "minus") == 0 ||
           strcmp(str, "multiplied") == 0 || strcmp(str, "divided") == 0;
}

bool answer(const char *question, int *result) {
    if (!is_valid_question(question))
        return false;

    size_t len = strlen(question);
    char temp_question[len + 1];
    strcpy(temp_question, question);

    if (temp_question[len - 1] == '?')
        temp_question[len - 1] = '\0';

    char *tokens[50]; // Assume a reasonable max number of tokens
    int token_count = 0;

    char *token = strtok(temp_question, " ");
    while (token) {
        tokens[token_count++] = token;
        token = strtok(NULL, " ");
    }

    if (token_count < 3 || !str_is_numeric(tokens[2]))
        return false;

    *result = atoi(tokens[2]);

    for (int i = 3; i < token_count; i += 2) {
        if (!is_valid_operator(tokens[i - 1]) || !str_is_numeric(tokens[i]))
            return false;

        int num = atoi(tokens[i]);
        if (strcmp(tokens[i - 1], "plus") == 0)
            *result += num;
        else if (strcmp(tokens[i - 1], "minus") == 0)
            *result -= num;
        else if (strcmp(tokens[i - 1], "multiplied") == 0)
            *result *= num;
        else if (strcmp(tokens[i - 1], "divided") == 0) {
            if (num == 0)
                return false;
            *result /= num;
        }
    }

    return true;
}