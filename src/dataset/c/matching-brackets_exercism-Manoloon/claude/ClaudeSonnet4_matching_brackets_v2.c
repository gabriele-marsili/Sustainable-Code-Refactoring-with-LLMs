#include "matching_brackets.h"
#include <stdlib.h>
#include <string.h>

bool is_paired(const char *input)
{
    if(input == NULL) return false;
    
    size_t size = strlen(input);
    if(size == 0) return true;
    
    // Count brackets first to determine actual stack size needed
    size_t bracket_count = 0;
    for(size_t i = 0; i < size; ++i) {
        char c = input[i];
        if(c == '(' || c == '[' || c == '{' || c == ')' || c == ']' || c == '}') {
            bracket_count++;
        }
    }
    
    if(bracket_count == 0) return true;
    if(bracket_count & 1) return false; // Odd number of brackets
    
    // Use stack allocation for small inputs, heap for large
    char stack_buffer[256];
    char* stack = (bracket_count <= 256) ? stack_buffer : (char*)malloc(bracket_count);
    
    int top = -1;
    for(size_t i = 0; i < size; ++i)
    {
        char curr = input[i];
        if(curr == '(' || curr == '[' || curr == '{')
        {
            stack[++top] = curr;
        } 
        else if (curr == ')' || curr == ']' || curr == '}')
        {
            if(top < 0)
            {
                if(stack != stack_buffer) free(stack);
                return false;
            }
            char topChar = stack[top--];
            if (((curr ^ topChar) != 1 && (curr ^ topChar) != 2) || 
                (curr == ')' && topChar != '(') ||
                (curr == ']' && topChar != '[') || 
                (curr == '}' && topChar != '{'))
            {
                if(stack != stack_buffer) free(stack);
                return false;
            }
        }
    }
    
    if(stack != stack_buffer) free(stack);
    return top == -1;
}