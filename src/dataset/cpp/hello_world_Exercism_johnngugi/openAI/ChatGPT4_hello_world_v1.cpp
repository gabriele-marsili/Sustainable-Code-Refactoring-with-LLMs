#include "hello_world.h"
#include <string_view>
using namespace hello_world;

std::string_view hello_world::hello() {
    static constexpr std::string_view message = "Hello, World!";
    return message;
}