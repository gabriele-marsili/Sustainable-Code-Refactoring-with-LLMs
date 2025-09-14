#include "hello_world.h"

namespace hello_world
{

const std::string& hello()
{
  static const std::string greeting = "Hello, World!";
  return greeting;
}

} // namespace hello_world