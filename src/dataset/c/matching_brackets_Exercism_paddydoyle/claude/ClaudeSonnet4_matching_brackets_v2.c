#include "matching_brackets.h"
#include <string.h>

#define EMPTY_INDEX -1

typedef struct {
    char *text;
    int index;
    size_t size;
} stack_t;

static inline bool _brackets_match(char opening, char closing) {
    return (opening == '[' && closing == ']') ||
           (opening == '{' && closing == '}') ||
           (opening == '(' && closing == ')');
}

static inline bool _is_opening(char c) {
    return c == '[' || c == '{' || c == '(';
}

static inline bool _is_closing(char c) {
    return c == ']' || c == '}' || c == ')';
}

bool is_paired(const char *input) {
    if (input == NULL) {
        return true;
    }
    
    size_t len = strlen(input);
    if (len == 0) {
        return true;
    }
    
    // Use stack array on stack for small inputs, malloc for large ones
    char stack_buffer[256];
    char *stack_text;
    bool use_malloc = len > 255;
    
    if (use_malloc) {
        stack_text = malloc(len + 1);
        if (stack_text == NULL) {
            return false;
        }
    } else {
        stack_text = stack_buffer;
    }
    
    int stack_index = EMPTY_INDEX;
    
    for (size_t i = 0; i < len; i++) {
        char c = input[i];
        
        if (_is_opening(c)) {
            if (stack_index + 1 >= (int)len) {
                if (use_malloc) free(stack_text);
                return false;
            }
            stack_text[++stack_index] = c;
        } else if (_is_closing(c)) {
            if (stack_index == EMPTY_INDEX) {
                if (use_malloc) free(stack_text);
                return false;
            }
            
            char popped = stack_text[stack_index--];
            if (!_brackets_match(popped, c)) {
                if (use_malloc) free(stack_text);
                return false;
            }
        }
    }
    
    bool result = (stack_index == EMPTY_INDEX);
    
    if (use_malloc) {
        free(stack_text);
    }
    
    return result;
}