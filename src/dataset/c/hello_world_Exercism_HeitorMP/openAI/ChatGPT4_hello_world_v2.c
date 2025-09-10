#include "hello_world.h"

const char *hello(void)
{
    static const char greeting[] = "Hello, World!";
    return greeting;
}