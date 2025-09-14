#include "hello_world.h"
#include <string.h>

#define BUFFER_LENGTH 128

void hello(char *buffer, const char *name)
{
    static const char prefix[] = "Hello, ";
    static const char suffix[] = "!";
    static const char default_name[] = "World";
    
    const char *actual_name = name ? name : default_name;
    
    char *ptr = buffer;
    
    // Copy prefix
    memcpy(ptr, prefix, sizeof(prefix) - 1);
    ptr += sizeof(prefix) - 1;
    
    // Copy name
    size_t name_len = strlen(actual_name);
    memcpy(ptr, actual_name, name_len);
    ptr += name_len;
    
    // Copy suffix and null terminator
    memcpy(ptr, suffix, sizeof(suffix));
}