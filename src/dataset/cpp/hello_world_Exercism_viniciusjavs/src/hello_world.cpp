#include "hello_world.h"

namespace hello_world {

using std::string_literals::operator""s;

std::string hello() { return "Hello, World!"s; }

} // namespace hello_world
