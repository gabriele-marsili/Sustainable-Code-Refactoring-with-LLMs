#include "hello_world.h"
#include <string>

namespace hello_world {

std::string hello() {
  static const std::string message = "Hello, World!";
  return message;
}

} // namespace hello_world