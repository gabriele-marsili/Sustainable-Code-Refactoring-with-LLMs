#include "binary.h"
#include <stdlib.h>
#include <string.h>

int convert(const char *input) 
{ 
    if(input == NULL) return 0;
    size_t length = strlen(input);
    
    // with this line you have almost all the exercise resolve.
    //int num = strtol(input,NULL,2);
    ////////////////////////////////

    size_t result = 0;
    for(size_t i = 0; i < length; ++i )
    {   
        if(input[i] == '1')
        {
            result += (1 << (length - 1 - i));
        }
        else if(input[i] != '0')
        {
            return INVALID;
        }
    }
    return (int)result; 
}
