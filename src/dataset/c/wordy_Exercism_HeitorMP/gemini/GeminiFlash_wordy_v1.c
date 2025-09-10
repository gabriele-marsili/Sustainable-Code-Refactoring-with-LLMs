#include "wordy.h"
#include <ctype.h>

int str_is_numeric(const char *str) {
    if (!str) return 0;
    int i = 0;
    if (str[0] == '+' || str[0] == '-') {
        i = 1;
    }
    while (str[i] != '\0') {
        if (!isdigit((unsigned char)str[i])) {
            return 0;
        }
        i++;
    }
    return 1;
}

bool is_valid_question(const char *str) {
    return (strncmp(str, "What is ", 8) == 0);
}

bool is_valid_operator(const char *str) {
    if (!str) return false;
    return (strcmp(str, "plus") == 0 || strcmp(str, "minus") == 0 ||
            strcmp(str, "by") == 0 || strcmp(str, "multiplied") == 0 ||
            strcmp(str, "divided") == 0);
}

bool answer(const char *question, int *result) {
    if (!question || !result) return false;

    if (!is_valid_question(question)) return false;

    size_t question_len = strlen(question);
    if (question_len < 9) return false;

    char *mutable_question = strdup(question);
    if (!mutable_question) return false;

    if (mutable_question[question_len - 1] == '?') {
        mutable_question[question_len - 1] = '\0';
    }

    char *token = strtok(mutable_question, " ");
    if (!token) {
        free(mutable_question);
        return false;
    }

    token = strtok(NULL, " "); 
    if (!token) {
        free(mutable_question);
        return false;
    }

    token = strtok(NULL, " ");
    if (!token || !str_is_numeric(token)) {
        free(mutable_question);
        return false;
    }
    *result = atoi(token);

    char *operator_str;
    char *number_str;
    while ((operator_str = strtok(NULL, " ")) != NULL) {
        if (!is_valid_operator(operator_str)) {
            free(mutable_question);
            return false;
        }

        number_str = strtok(NULL, " ");
        if (!number_str || !str_is_numeric(number_str)) {
            free(mutable_question);
            return false;
        }

        int number = atoi(number_str);

        if (strcmp(operator_str, "plus") == 0) {
            *result += number;
        } else if (strcmp(operator_str, "minus") == 0) {
            *result -= number;
        } else if (strcmp(operator_str, "by") == 0) {
            operator_str = strtok(NULL, " ");
            if (!operator_str) {
                free(mutable_question);
                return false;
            }
            if (strcmp(operator_str, "divided") == 0) {
                *result /= number;
            } else if (strcmp(operator_str, "multiplied") == 0) {
                *result *= number;
            } else {
                free(mutable_question);
                return false;
            }
        }
    }

    free(mutable_question);
    return true;
}