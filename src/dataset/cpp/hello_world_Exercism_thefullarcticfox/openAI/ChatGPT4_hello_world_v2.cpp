#include "hello_world.h"

namespace hello_world {

const string& hello() {
    static const string message = "Hello, World!";
    return message;
}

}  // namespace hello_world