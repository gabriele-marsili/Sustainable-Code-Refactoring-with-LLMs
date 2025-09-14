#include <string.h>
#include <stdio.h>
#include <stddef.h>
#include "hello_world.h"

#define HELLO "Hello, World"

void hello(char *buffer, const char *name)
{
    static const char hello_prefix[] = "Hello, ";
    static const char hello_suffix[] = "!";
    static const char default_name[] = "World";
    
    const char *actual_name = name ? name : default_name;
    
    char *ptr = buffer;
    const char *src = hello_prefix;
    while (*src) *ptr++ = *src++;
    
    src = actual_name;
    while (*src) *ptr++ = *src++;
    
    src = hello_suffix;
    while (*src) *ptr++ = *src++;
    
    *ptr = '\0';
}