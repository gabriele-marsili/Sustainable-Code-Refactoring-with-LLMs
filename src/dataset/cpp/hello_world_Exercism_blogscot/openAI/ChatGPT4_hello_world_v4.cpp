#include "hello_world.h"

namespace hello_world
{

inline const std::string& hello()
{
    static const std::string message = "Hello, World!";
    return message;
}

} // namespace hello_world