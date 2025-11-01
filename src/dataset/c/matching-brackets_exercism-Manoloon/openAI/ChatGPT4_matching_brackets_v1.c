#include "matching_brackets.h"
#include <stdbool.h>

bool is_paired(const char *input)
{
    if (!input) return false;

    char stack[256]; // Fixed-size stack to avoid dynamic memory allocation
    int top = -1;

    for (const char *p = input; *p; ++p)
    {
        char curr = *p;
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