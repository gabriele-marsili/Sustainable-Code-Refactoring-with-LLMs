#include "hello_world.h"

static const char hello_string[] = "Hello, World!";

const char *hello(void)
{
  return hello_string;
}