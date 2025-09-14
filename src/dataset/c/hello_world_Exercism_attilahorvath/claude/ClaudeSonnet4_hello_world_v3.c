#include "hello_world.h"
#include <string.h>

#define BUFFER_LENGTH 128

void hello(char *buffer, const char *name)
{
    static const char prefix[] = "Hello, ";
    static const char suffix[] = "!";
    static const char default_name[] = "World";
    
    const char *target_name = name ? name : default_name;
    
    const size_t prefix_len = sizeof(prefix) - 1;
    const size_t suffix_len = sizeof(suffix) - 1;
    const size_t name_len = strlen(target_name);
    const size_t total_len = prefix_len + name_len + suffix_len;
    
    if (total_len < BUFFER_LENGTH) {
        memcpy(buffer, prefix, prefix_len);
        memcpy(buffer + prefix_len, target_name, name_len);
        memcpy(buffer + prefix_len + name_len, suffix, suffix_len + 1);
    } else {
        const size_t max_name_len = BUFFER_LENGTH - prefix_len - suffix_len - 1;
        memcpy(buffer, prefix, prefix_len);
        memcpy(buffer + prefix_len, target_name, max_name_len);
        memcpy(buffer + prefix_len + max_name_len, suffix, suffix_len + 1);
    }
}