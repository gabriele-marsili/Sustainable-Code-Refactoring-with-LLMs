#include "hello_world.h"

// Define the function itself.
const char *hello(void) { 
    static const char hello_string[] = "Hello, World!";
    return hello_string; 
}