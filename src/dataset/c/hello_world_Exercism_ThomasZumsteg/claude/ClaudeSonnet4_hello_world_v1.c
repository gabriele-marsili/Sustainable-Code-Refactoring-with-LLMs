#include <string.h>
#include <stdio.h>
#include <stddef.h>
#include "hello_world.h"

#define HELLO "Hello, World"

void hello(char *buffer, const char *name)
{
    const char *greeting = "Hello, ";
    const char *exclamation = "!";
    const char *default_name = "World";
    
    if (name == NULL)
        name = default_name;
    
    char *ptr = buffer;
    
    // Copy "Hello, "
    const char *src = greeting;
    while (*src) {
        *ptr++ = *src++;
    }
    
    // Copy name
    src = name;
    while (*src) {
        *ptr++ = *src++;
    }
    
    // Copy "!"
    *ptr++ = '!';
    *ptr = '\0';
}