#include "hello_world.h"

namespace hello_world
{
    const std::string hello()
    {
        static const std::string result = "Hello, World!";
        return result;
    }
}