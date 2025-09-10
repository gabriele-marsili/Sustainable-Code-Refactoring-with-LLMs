#include "hello_world.h"
#include <string_view>

namespace hello_world
{

std::string hello()
{
  static constexpr std::string_view message = "Hello, World!";
  return std::string(message);
}

} // namespace hello_world