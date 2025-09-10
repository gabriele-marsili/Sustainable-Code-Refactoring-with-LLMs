#include "wordy.h"
#include <ctype.h>

int str_is_numeric(const char *str) {
    if (!str) return 0;
    int i = 0;
    if (str[0] == '+' || str[0] == '-') {
        i = 1;
    }
    if (str[i] == '\0') return 0; 

    for (; str[i] != '\0'; i++) {
        if (!isdigit((unsigned char)str[i])) {
            return 0;
        }
    }
    return 1;
}

int count_words(const char *str) {
    if (!str) return 0;
    int count = 0;
    int in_word = 0;
    for (int i = 0; str[i] != '\0'; i++) {
        if (isspace((unsigned char)str[i])) {
            in_word = 0;
        } else if (in_word == 0) {
            in_word = 1;
            count++;
        }
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

    char temp_question[256];
    size_t question_len = strnlen(question, 255);
    if (question_len == 255) return false; 
    strncpy(temp_question, question, question_len + 1);

    if (!is_valid_question(temp_question))
        return false;

    if (temp_question[question_len - 1] == '?') {
        temp_question[question_len - 1] = '\0';
    }

    char *token;
    token = strtok(temp_question, " ");
    if (!token) return false;
    token = strtok(NULL, " ");
    if (!token) return false;
    token = strtok(NULL, " ");
    if (!token) return false;

    if (!str_is_numeric(token)) return false;
    *result = atoi(token);

    int temp_number;
    char *prev_token = token;
    while ((token = strtok(NULL, " ")) != NULL) {
        if (strcmp(token, prev_token) == 0) return false;
        if (str_is_numeric(token)) {
            if (str_is_numeric(prev_token)) return false;
            temp_number = atoi(token);
            if (strcmp(prev_token, "plus") == 0) {
                *result += temp_number;
            } else if (strcmp(prev_token, "minus") == 0) {
                *result -= temp_number;
            } else if (strcmp(prev_token, "by") == 0) {
                char *prev_prev_token = strtok(temp_question, " ");
                char *temp_ptr = temp_question;
                int count = 0;
                while(temp_ptr && count < 3)
                {
                    prev_prev_token = strsep(&temp_ptr, " ");
                    count++;
                }
                
                if (strcmp(prev_prev_token, "divided") == 0) {
                    if (temp_number == 0) return false;
                    *result /= temp_number;
                } else if (strcmp(prev_prev_token, "multiplied") == 0) {
                    *result *= temp_number;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        prev_token = token;
    }

    return true;
}