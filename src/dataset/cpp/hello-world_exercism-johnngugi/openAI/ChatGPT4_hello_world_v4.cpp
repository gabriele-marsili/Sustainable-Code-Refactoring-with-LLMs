#include "hello_world.h"
#include <string>

namespace hello_world {

const std::string& hello() {
    static const std::string message = "Hello, World!";
    return message;
}

}