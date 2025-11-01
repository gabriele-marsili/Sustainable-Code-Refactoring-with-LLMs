#include "matching_brackets.h"
#include <stdlib.h>
#include <string.h>

bool is_paired(const char *input)
{
    if (!input) return false;

    char stack[256];
    int top = -1;

    for (size_t i = 0; input[i] != '\0'; ++i)
    {
        char curr = input[i];
        if (curr == '(' || curr == '[' || curr == '{')
        {
            if (top == 255) return false; // Prevent stack overflow
            stack[++top] = curr;
        }
        else if (curr == ')' || curr == ']' || curr == '}')
        {
            if (top < 0) return false;
            char topChar = stack[top--];
            if ((curr == ')' && topChar != '(') ||
                (curr == ']' && topChar != '[') ||
                (curr == '}' && topChar != '{'))
            {
                return false;
            }
        }
    }
    return top == -1;
}