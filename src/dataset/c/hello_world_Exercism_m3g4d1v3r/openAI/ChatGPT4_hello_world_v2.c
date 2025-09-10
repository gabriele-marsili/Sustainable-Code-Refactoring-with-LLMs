#include "hello_world.h"

// Use a static constant to avoid reinitialization on each call.
const char *hello(void) {
    static const char message[] = "Hello, World!";
    return message;
}