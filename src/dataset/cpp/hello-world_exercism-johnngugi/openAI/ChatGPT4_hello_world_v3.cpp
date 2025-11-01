#include "hello_world.h"
#include <string>
using namespace hello_world;

std::string hello_world::hello() {
    static const std::string message = "Hello, World!";
    return message;
}