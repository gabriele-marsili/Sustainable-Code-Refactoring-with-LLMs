#include "wordy.h"

int str_is_numeric(char *str)
{
    if (!str || !*str)
        return 0;
    
    int i = (*str == '+' || *str == '-') ? 1 : 0;
    
    if (!str[i])
        return 0;
    
    while (str[i]) {
        if (str[i] < '0' || str[i] > '9')
            return 0;
        i++;
    }
    return 1;
}

int count_words(char *str)
{
    if (!str || !*str)
        return 0;
    
    int count = 1;
    while (*str) {
        if (*str == ' ')
            count++;
        str++;
    }
    return count;
}

bool is_valid_question(char *str)
{
    return strncmp(str, "What is ", 8) == 0;
}

bool is_valid_operator(char *str)
{
    static const char* operators[] = {"plus", "minus", "by", "multiplied", "divided"};
    static const int num_operators = 5;
    
    for (int i = 0; i < num_operators; i++) {
        if (strcmp(str, operators[i]) == 0)
            return true;
    }
    return false;
}

bool answer(const char *question, int *result)
{
    if (!question || !result)
        return false;
    
    int len = strlen(question);
    if (len < 9)
        return false;
    
    char temp_question[len + 1];
    strcpy(temp_question, question);
    
    if (!is_valid_question(temp_question))
        return false;
    
    if (temp_question[len - 1] == '?')
        temp_question[len - 1] = '\0';
    
    int size = count_words(temp_question);
    if (size < 4)
        return false;
    
    char *tokens[size];
    char *token = strtok(temp_question, " ");
    int i = 0;
    
    while (token && i < size) {
        tokens[i] = token;
        token = strtok(NULL, " ");
        i++;
    }
    
    if (i != size)
        return false;
    
    int count_numbers = 0;
    for (int j = 0; j < size; j++) {
        if (str_is_numeric(tokens[j]))
            count_numbers++;
    }
    
    if (count_numbers < 2 || !str_is_numeric(tokens[size - 1]))
        return false;
    
    *result = atoi(tokens[2]);
    
    for (int index = 3; index < size; index++) {
        if (strcmp(tokens[index], tokens[index - 1]) == 0)
            return false;
        
        if (str_is_numeric(tokens[index])) {
            if (str_is_numeric(tokens[index - 1]))
                return false;
            
            int temp_number = atoi(tokens[index]);
            char *op = tokens[index - 1];
            
            if (strcmp(op, "plus") == 0) {
                *result += temp_number;
            } else if (strcmp(op, "minus") == 0) {
                *result -= temp_number;
            } else if (strcmp(op, "by") == 0) {
                if (index >= 2) {
                    char *prev_op = tokens[index - 2];
                    if (strcmp(prev_op, "divided") == 0) {
                        if (temp_number == 0)
                            return false;
                        *result /= temp_number;
                    } else if (strcmp(prev_op, "multiplied") == 0) {
                        *result *= temp_number;
                    }
                }
            }
        }
    }
    
    return true;
}