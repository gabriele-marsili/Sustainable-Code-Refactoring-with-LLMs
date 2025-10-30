#include "matching_brackets.h"
#include <stdlib.h>
#include <string.h>

bool is_paired(const char *input)
{
    if(input == NULL) return false;
    size_t size = strlen(input);
    char* stack = (char*)calloc(size,sizeof(char));
    int top = -1;
    for(size_t i= 0; i < size; ++i)
    {
        char curr = input[i];
        if(curr == '(' || curr == '[' || curr == '{')
        {
            top++;
            stack[top] = curr;
        } 
        else if (curr == ')' || curr == ']' || curr == '}')
        {
            if(top < 0)
            {
                free(stack);
                return false;
            }
            char topChar = stack[top];
            top--;
            if (( curr == ')' && topChar != '(') ||
                    (curr == ']' && topChar != '[') || 
                    (curr == '}' && topChar != '{'))
                    {
                        free(stack);
                        return false;
                    }
        }
    }
    free(stack);
    return top == -1;
}
