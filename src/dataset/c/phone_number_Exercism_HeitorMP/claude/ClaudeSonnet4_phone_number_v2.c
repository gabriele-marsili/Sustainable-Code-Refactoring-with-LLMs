#include "phone_number.h"

char *phone_number_clean(const char *input)
{
    char *result = (char *)calloc(11, sizeof(char));
    int i = 0;
    int j = 0;
    
    // Skip non-digits and leading '1'
    while (input[i] != '\0' && (!isdigit(input[i]) || input[i] == '1'))
        i++;
    
    // Extract digits
    while (input[i] != '\0' && j < 10)
    {
        if (isdigit(input[i]))
        {
            result[j] = input[i];
            j++;
        }      
        i++;
    }
    
    // Validate: exactly 10 digits, first and fourth digits >= '2'
    if (j != 10 || result[0] < '2' || result[3] < '2')
    {
        memset(result, '0', 10);
    }
    
    result[10] = '\0';
    return result;
}