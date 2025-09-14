#include "hello_world.h"

// Define the function itself.
const char *hello(void) { 
    static const char msg[] = "Hello, World!";
    return msg; 
}