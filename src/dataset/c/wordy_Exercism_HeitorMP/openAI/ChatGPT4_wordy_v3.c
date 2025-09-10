#include "wordy.h"

int str_is_numeric(char *str) {
    if (*str == '+' || *str == '-') str++;
    while (*str) {
        if (*str < '0' || *str > '9') return 0;
        str++;
    }
    return 1;
}

int count_words(char *str) {
    int count = 1;
    while (*str) {
        if (*str == ' ') count++;
        str++;
    }
    return count;
}

bool is_valid_question(char *str) {
    return strncmp(str, "What is ", 8) == 0;
}

bool is_valid_operator(char *str) {
    return strcmp(str, "plus") == 0 || strcmp(str, "minus") == 0 ||
           strcmp(str, "by") == 0 || strcmp(str, "multiplied") == 0 ||
           strcmp(str, "divided") == 0;
}

bool answer(const char *question, int *result) {
    if (!question || !result) return false;

    char temp_question[strlen(question) + 1];
    strcpy(temp_question, question);

    if (!is_valid_question(temp_question)) return false;

    size_t len = strlen(temp_question);
    if (temp_question[len - 1] == '?') temp_question[len - 1] = '\0';

    char *tokens[50];
    int size = 0;

    char *token = strtok(temp_question, " ");
    while (token && size < 50) {
        tokens[size++] = token;
        token = strtok(NULL, " ");
    }

    if (size < 3 || !str_is_numeric(tokens[2])) return false;

    *result = atoi(tokens[2]);
    for (int i = 3; i < size; i += 2) {
        if (i + 1 >= size || !str_is_numeric(tokens[i + 1]) || !is_valid_operator(tokens[i])) return false;

        int num = atoi(tokens[i + 1]);
        if (strcmp(tokens[i], "plus") == 0) {
            *result += num;
        } else if (strcmp(tokens[i], "minus") == 0) {
            *result -= num;
        } else if (strcmp(tokens[i], "multiplied") == 0 && i > 1 && strcmp(tokens[i - 1], "by") == 0) {
            *result *= num;
        } else if (strcmp(tokens[i], "divided") == 0 && i > 1 && strcmp(tokens[i - 1], "by") == 0) {
            if (num == 0) return false;
            *result /= num;
        } else {
            return false;
        }
    }

    return true;
}