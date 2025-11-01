#include "matching_brackets.h"
#include <stdlib.h>
#include <string.h>

bool is_paired(const char *input)
{
    if(input == NULL) return false;
    
    size_t size = strlen(input);
    if(size == 0) return true;
    
    char stack[size];
    int top = -1;
    
    for(size_t i = 0; i < size; ++i)
    {
        char curr = input[i];
        switch(curr)
        {
            case '(':
            case '[':
            case '{':
                if(++top >= (int)size) return false;
                stack[top] = curr;
                break;
            case ')':
                if(top < 0 || stack[top--] != '(') return false;
                break;
            case ']':
                if(top < 0 || stack[top--] != '[') return false;
                break;
            case '}':
                if(top < 0 || stack[top--] != '{') return false;
                break;
        }
    }
    
    return top == -1;
}