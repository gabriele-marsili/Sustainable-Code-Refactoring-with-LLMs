#include "hello_world.h"
#include <string.h>

#define BUFFER_LENGTH 128
#define HELLO_PREFIX "Hello, "
#define HELLO_SUFFIX "!"
#define DEFAULT_NAME "World"

void hello(char *buffer, const char *name)
{
    const char *target_name = name ? name : DEFAULT_NAME;
    
    // Use strcpy and strcat for better performance with small strings
    strcpy(buffer, HELLO_PREFIX);
    strcat(buffer, target_name);
    strcat(buffer, HELLO_SUFFIX);
}