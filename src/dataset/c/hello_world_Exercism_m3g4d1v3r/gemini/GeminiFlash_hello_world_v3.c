#include "hello_world.h"

// Define the function itself.
const char *hello(void) {
  static const char message[] = "Hello, World!";
  return message;
}