#include "matching_brackets.h"
#include <stdlib.h>

bool is_paired(const char *input)
{
    if(input == NULL) return false;
    
    int bracket_count = 0;
    for(const char *p = input; *p; ++p)
    {
        if(*p == '(' || *p == '[' || *p == '{')
        {
            bracket_count++;
        }
        else if(*p == ')' || *p == ']' || *p == '}')
        {
            bracket_count++;
        }
    }
    
    if(bracket_count == 0) return true;
    
    char stack[bracket_count];
    int top = -1;
    
    for(const char *p = input; *p; ++p)
    {
        char curr = *p;
        if(curr == '(' || curr == '[' || curr == '{')
        {
            stack[++top] = curr;
        } 
        else if (curr == ')' || curr == ']' || curr == '}')
        {
            if(top < 0) return false;
            
            char topChar = stack[top--];
            if (( curr == ')' && topChar != '(') ||
                    (curr == ']' && topChar != '[') || 
                    (curr == '}' && topChar != '{'))
            {
                return false;
            }
        }
    }
    return top == -1;
}