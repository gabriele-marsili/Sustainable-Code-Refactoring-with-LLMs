#include <stddef.h>
#include "unity.h"
#include "../src/hello_world.h"

void setUp(void)
{
}

void tearDown(void)
{
}

static void test_hello(void)
{
   TEST_ASSERT_EQUAL_STRING("Hello, World!", hello());
}

int main(void)
{
   UnityBegin("test/test_hello_world.c");

   RUN_TEST(test_hello);

   return UnityEnd();
}
