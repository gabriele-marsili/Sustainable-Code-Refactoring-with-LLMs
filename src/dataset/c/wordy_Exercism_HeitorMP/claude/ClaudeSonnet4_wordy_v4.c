#include "wordy.h"

int	str_is_numeric(char *str)
{
	int	i = 0;

    if (str[0] == '+' || str[0] == '-')
	    i = 1;
	while (str[i] != '\0')
	{
		if (!(str[i] >= '0' && str[i] <= '9'))
		{
			return (0);
		}
		i++;
	}
	return (1);
}

int count_words(char *str)
{
    int count = 1;
    char *ptr = str;
    
    while (*ptr) 
    {
        if (*ptr == ' ')
            count++;
        ptr++;
    }
    return count;
}

bool is_valid_question(char *str)
{  
    return (strncmp(str, "What is ", 8) == 0);
}

bool is_valid_operator(char *str)
{
    switch (str[0]) {
        case 'p':
            return strcmp(str, "plus") == 0;
        case 'm':
            return strcmp(str, "minus") == 0 || strcmp(str, "multiplied") == 0;
        case 'b':
            return strcmp(str, "by") == 0;
        case 'd':
            return strcmp(str, "divided") == 0;
        default:
            return false;
    }
}

bool answer(const char *question, int *result)
{
    int question_len = strlen(question);
    char temp_question[question_len + 1];
    strcpy(temp_question, question);

    if (!is_valid_question(temp_question))
        return false;

    if (temp_question[question_len - 1] == '?')
        temp_question[question_len - 1] = '\0';

    int size = count_words(temp_question);
    char *tokens[size];
    
    char *token = strtok(temp_question, " ");
    int i = 0;
    while (token != NULL && i < size)
    {
        tokens[i] = token;
        token = strtok(NULL, " ");
        i++;
    }

    int count_numbers = 0;
    for (int ii = 0; ii < size; ii++)
    {
        if (str_is_numeric(tokens[ii]))
            count_numbers++;
    }
    
    if (count_numbers < 2 && !str_is_numeric(tokens[size - 1]))
        return false;

    *result = atoi(tokens[2]);

    for (int index = 3; index < size; index++)
    {  
        if (strcmp(tokens[index], tokens[index-1]) == 0)
            return false;
            
        if (str_is_numeric(tokens[index]))
        {
            if (str_is_numeric(tokens[index - 1]))
                return false;
                
            int temp_number = atoi(tokens[index]);
            char *op = tokens[index - 1];
            
            switch (op[0]) {
                case 'p':
                    *result += temp_number;
                    break;
                case 'm':
                    *result -= temp_number;
                    break;
                case 'b':
                    if (index >= 2) {
                        char *prev_op = tokens[index - 2];
                        if (prev_op[0] == 'd')
                            *result /= temp_number;
                        else if (prev_op[0] == 'm')
                            *result *= temp_number;
                    }
                    break;
            }
        }
    }
    return true;
}