#include "hello_world.h"
#include <string>
using namespace hello_world;

const std::string& hello_world::hello() {
    static const std::string message = "Hello, World!";
    return message;
}