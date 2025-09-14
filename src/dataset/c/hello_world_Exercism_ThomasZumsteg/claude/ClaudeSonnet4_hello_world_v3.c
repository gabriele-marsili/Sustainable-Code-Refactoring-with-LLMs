#include <string.h>
#include <stdio.h>
#include <stddef.h>
#include "hello_world.h"

#define HELLO "Hello, World"

void hello(char *buffer, const char *name)
{
    static const char prefix[] = "Hello, ";
    static const char suffix[] = "!";
    static const char default_name[] = "World";
    
    const char *target_name = name ? name : default_name;
    
    char *ptr = buffer;
    const char *src = prefix;
    while (*src) *ptr++ = *src++;
    
    src = target_name;
    while (*src) *ptr++ = *src++;
    
    src = suffix;
    while (*src) *ptr++ = *src++;
    
    *ptr = '\0';
}