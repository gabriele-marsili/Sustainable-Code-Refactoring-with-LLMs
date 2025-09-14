#include "hello_world.h"

namespace hello_world
{

std::string hello()
{
  static const std::string result = "Hello, World!";
  return result;
}

} // namespace hello_world