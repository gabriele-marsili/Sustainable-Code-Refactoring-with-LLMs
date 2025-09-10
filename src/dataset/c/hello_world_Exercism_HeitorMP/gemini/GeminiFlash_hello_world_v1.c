#include "hello_world.h"

const char *hello(void) {
  static const char message[] = "Hello, World!";
  return message;
}