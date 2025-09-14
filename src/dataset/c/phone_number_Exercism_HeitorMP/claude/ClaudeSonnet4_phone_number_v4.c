#include "phone_number.h"

void    clean_invalid_number(char *input)
{
    memset(input, '0', 10);
    input[10] = '\0';
}

char *phone_number_clean(const char *input)
{
    char *result = (char *)calloc(11, sizeof(char));
    int j = 0;
    int found_first_digit = 0;
    
    for (const char *p = input; *p && j < 10; p++)
    {
        if (isdigit(*p))
        {
            if (!found_first_digit && *p == '1')
            {
                found_first_digit = 1;
                continue;
            }
            found_first_digit = 1;
            result[j++] = *p;
        }
    }
    
    if (j != 10 || result[0] < '2' || result[3] < '2')
        clean_invalid_number(result);
    
    return result;
}