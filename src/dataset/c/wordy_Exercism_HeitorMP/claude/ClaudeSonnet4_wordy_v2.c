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

bool is_valid_question(const char *str)
{  
    return (strncmp(str, "What is ", 8) == 0);
}

bool answer(const char *question, int *result)
{
    int len = strlen(question);
    if (len < 10 || !is_valid_question(question))
        return false;

    char temp_question[len + 1];
    strcpy(temp_question, question);

    if (temp_question[len - 1] == '?')
        temp_question[len - 1] = '\0';

    char *token = strtok(temp_question + 8, " ");
    if (!token || !str_is_numeric(token))
        return false;

    *result = atoi(token);
    int count_numbers = 1;
    char *prev_token = NULL;
    
    while ((token = strtok(NULL, " ")) != NULL)
    {
        if (prev_token && strcmp(token, prev_token) == 0)
            return false;
            
        if (str_is_numeric(token))
        {
            if (prev_token && str_is_numeric(prev_token))
                return false;
                
            count_numbers++;
            int temp_number = atoi(token);
            
            if (prev_token)
            {
                if (strcmp(prev_token, "plus") == 0)
                    *result += temp_number;
                else if (strcmp(prev_token, "minus") == 0)
                    *result -= temp_number;
                else if (strcmp(prev_token, "by") == 0)
                {
                    char *op_token = strtok(NULL, " ");
                    if (!op_token) return false;
                    
                    if (strcmp(op_token, "divided") == 0)
                        *result /= temp_number;
                    else if (strcmp(op_token, "multiplied") == 0)
                        *result *= temp_number;
                    else
                        return false;
                }
                else
                    return false;
            }
        }
        prev_token = token;
    }
    
    return (count_numbers >= 2);
}