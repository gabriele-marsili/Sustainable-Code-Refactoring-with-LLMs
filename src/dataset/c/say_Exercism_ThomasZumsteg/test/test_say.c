#include "unity.h"
#include "../src/say.h"
#include <stdlib.h>

void setUp(void)
{
}

void tearDown(void)
{
}

void test_zero(void)
{
   char *ans = NULL;
   int res = say(0, &ans);
   TEST_ASSERT_EQUAL_INT(0, res);
   TEST_ASSERT_EQUAL_STRING("zero", ans);
   free(ans);
}

void test_one(void)
{
   char *ans = NULL;
   int res = say(1, &ans);
   TEST_ASSERT_EQUAL_INT(0, res);
   TEST_ASSERT_EQUAL_STRING("one", ans);
   free(ans);
}

void test_fourteen(void)
{
   char *ans = NULL;
   int res = say(14, &ans);
   TEST_ASSERT_EQUAL_INT(0, res);
   TEST_ASSERT_EQUAL_STRING("fourteen", ans);
   free(ans);
}

void test_twenty(void)
{
   char *ans = NULL;
   int res = say(20, &ans);
   TEST_ASSERT_EQUAL_INT(0, res);
   TEST_ASSERT_EQUAL_STRING("twenty", ans);
   free(ans);
}

void test_twenty_two(void)
{
   char *ans = NULL;
   int res = say(22, &ans);
   TEST_ASSERT_EQUAL_INT(0, res);
   TEST_ASSERT_EQUAL_STRING("twenty-two", ans);
   free(ans);
}

void test_one_hundred(void)
{
   char *ans = NULL;
   int res = say(100, &ans);
   TEST_ASSERT_EQUAL_INT(0, res);
   TEST_ASSERT_EQUAL_STRING("one hundred", ans);
   free(ans);
}

void test_one_hundred_twenty_three(void)
{
   char *ans = NULL;
   int res = say(123, &ans);
   TEST_ASSERT_EQUAL_INT(0, res);
   TEST_ASSERT_EQUAL_STRING("one hundred twenty-three", ans);
   free(ans);
}

void test_one_thousand(void)
{
   char *ans = NULL;
   int res = say(1000, &ans);
   TEST_ASSERT_EQUAL_INT(0, res);
   TEST_ASSERT_EQUAL_STRING("one thousand", ans);
   free(ans);
}

void test_one_thousand_two_hundred_thirty_four(void)
{
   char *ans = NULL;
   int res = say(1234, &ans);
   TEST_ASSERT_EQUAL_INT(0, res);
   TEST_ASSERT_EQUAL_STRING("one thousand two hundred thirty-four", ans);
   free(ans);
}

void test_one_million(void)
{
   char *ans = NULL;
   int res = say(1000000, &ans);
   TEST_ASSERT_EQUAL_INT(0, res);
   TEST_ASSERT_EQUAL_STRING("one million", ans);
   free(ans);
}

void test_one_million_two_thousand_three_hundred_forty_five(void)
{
   char *ans = NULL;
   int res = say(1002345, &ans);
   TEST_ASSERT_EQUAL_INT(0, res);
   TEST_ASSERT_EQUAL_STRING("one million two thousand three hundred "
                            "forty-five", ans);
   free(ans);
}

void test_one_billion(void)
{
   char *ans = NULL;
   int res = say(1000000000, &ans);
   TEST_ASSERT_EQUAL_INT(0, res);
   TEST_ASSERT_EQUAL_STRING("one billion", ans);
   free(ans);
}

void test_a_big_number(void)
{
   char *ans = NULL;
   int res = say(987654321123, &ans);
   TEST_ASSERT_EQUAL_INT(0, res);
   TEST_ASSERT_EQUAL_STRING("nine hundred eighty-seven billion six hundred "
                            "fifty-four million three hundred twenty-one "
                            "thousand one hundred twenty-three", ans);
   free(ans);
}

void test_numbers_below_zero_are_out_of_range(void)
{
   char *ans = NULL;
   int res = say(-1, &ans);
   TEST_ASSERT_EQUAL_INT(-1, res);
   free(ans);
}

void test_numbers_above_999_999_999_999_are_out_of_range(void)
{
   char *ans = NULL;
   int res = say(1000000000000, &ans);
   TEST_ASSERT_EQUAL_INT(-1, res);
   free(ans);
}

int main(void)
{
   UnityBegin("test/test_say.c");

   RUN_TEST(test_zero);
   RUN_TEST(test_one);
   RUN_TEST(test_fourteen);
   RUN_TEST(test_twenty);
   RUN_TEST(test_twenty_two);
   RUN_TEST(test_one_hundred);
   RUN_TEST(test_one_hundred_twenty_three);
   RUN_TEST(test_one_thousand);
   RUN_TEST(test_one_thousand_two_hundred_thirty_four);
   RUN_TEST(test_one_million);
   RUN_TEST(test_one_million_two_thousand_three_hundred_forty_five);
   RUN_TEST(test_one_billion);
   RUN_TEST(test_a_big_number);
   RUN_TEST(test_numbers_below_zero_are_out_of_range);
   RUN_TEST(test_numbers_above_999_999_999_999_are_out_of_range);

   UnityEnd();
   return 0;
}
