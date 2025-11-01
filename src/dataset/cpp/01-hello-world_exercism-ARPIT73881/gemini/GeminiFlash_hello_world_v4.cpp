#include "hello_world.h"

namespace hello_world
{

    std::string hello()
    {
        static const std::string message = "Hello, World!";
        return message;
    }

}