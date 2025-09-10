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

int count_words(const char *str) {
    if (!str) return 0;
    int count = 0;
    int i = 0;
    bool in_word = false;
    while (str[i] != '\0') {
        if (str[i] == ' ') {
            if (in_word) {
                in_word = false;
                count++;
            }
        } else {
            in_word = true;
        }
        i++;
    }
    if (in_word) {
        count++;
    }
    return count;
}

bool is_valid_question(const char *str) {
    return (str != NULL && strncmp(str, "What is ", 8) == 0);
}

bool is_valid_operator(const char *str) {
    if (!str) return false;
    return (strcmp(str, "plus") == 0 ||
            strcmp(str, "minus") == 0 ||
            strcmp(str, "by") == 0 ||
            strcmp(str, "multiplied") == 0 ||
            strcmp(str, "divided") == 0);
}

bool answer(const char *question, int *result) {
    if (!question || !result) return false;

    size_t question_len = strlen(question);
    if (question_len < 9 || !is_valid_question(question)) return false;

    char temp_question[question_len + 1];
    strcpy(temp_question, question);

    if (temp_question[question_len - 1] == '?') {
        temp_question[question_len - 1] = '\0';
    }

    char *token;
    char *rest = temp_question;
    int size = count_words(temp_question);
    if (size < 3) return false;

    char *final_token[size];
    int i = 0;
    while ((token = strtok_r(rest, " ", &rest)) != NULL && i < size) {
        final_token[i++] = token;
    }

    if (!str_is_numeric(final_token[2])) return false;
    *result = atoi(final_token[2]);

    int index = 3;
    int temp_number = 0;
    while (index < size) {
        if (strcmp(final_token[index], final_token[index - 1]) == 0) return false;
        if (str_is_numeric(final_token[index])) {
            if (str_is_numeric(final_token[index - 1])) return false;
            temp_number = atoi(final_token[index]);
            if (strcmp(final_token[index - 1], "plus") == 0) {
                *result += temp_number;
            } else if (strcmp(final_token[index - 1], "minus") == 0) {
                *result -= temp_number;
            } else if (strcmp(final_token[index - 1], "by") == 0) {
                if (index > 4 && strcmp(final_token[index - 2], "divided") == 0) {
                    *result /= temp_number;
                } else if (index > 4 && strcmp(final_token[index - 2], "multiplied") == 0) {
                    *result *= temp_number;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        index++;
    }

    return true;
}