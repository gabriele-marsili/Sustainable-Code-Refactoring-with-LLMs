#include "unity.h"
#include "roman_numerals.h"
#include <stdlib.h>

void setUp(void)
{
}

void tearDown(void)
{
}

static void check_conversion(int number, char *expected)
{
   char *result = to_roman_numeral(number);
   TEST_ASSERT_EQUAL_STRING(expected, result);
   free(result);
}

static void test_1_is_I(void)
{
   check_conversion(1, "I");
}

static void test_2_is_II(void)
{
   check_conversion(2, "II");
}

static void test_3_is_III(void)
{
   check_conversion(3, "III");
}

static void test_4_is_IV(void)
{
   check_conversion(4, "IV");
}

static void test_5_is_V(void)
{
   check_conversion(5, "V");
}

static void test_6_is_VI(void)
{
   check_conversion(6, "VI");
}

static void test_9_is_IX(void)
{
   check_conversion(9, "IX");
}

static void test_27_is_XXVII(void)
{
   check_conversion(27, "XXVII");
}

static void test_48_is_XLVIII(void)
{
   check_conversion(48, "XLVIII");
}

static void test_49_is_XLIX(void)
{
   check_conversion(49, "XLIX");
}

static void test_59_is_LIX(void)
{
   check_conversion(59, "LIX");
}

static void test_93_is_XCIII(void)
{
   check_conversion(93, "XCIII");
}

static void test_141_is_CXLI(void)
{
   check_conversion(141, "CXLI");
}

static void test_163_is_CLXIII(void)
{
   check_conversion(163, "CLXIII");
}

static void test_402_is_CDII(void)
{
   check_conversion(402, "CDII");
}

static void test_575_is_DLXXV(void)
{
   check_conversion(575, "DLXXV");
}

static void test_911_is_CMXI(void)
{
   check_conversion(911, "CMXI");
}

static void test_1024_is_MXXIV(void)
{
   check_conversion(1024, "MXXIV");
}

static void test_3000_is_MMM(void)
{
   check_conversion(3000, "MMM");
}

static void test_16_is_XVI(void)
{
   check_conversion(16, "XVI");
}

static void test_66_is_LXVI(void)
{
   check_conversion(66, "LXVI");
}

static void test_166_is_CLXVI(void)
{
   check_conversion(166, "CLXVI");
}

static void test_666_is_DCLXVI(void)
{
   check_conversion(666, "DCLXVI");
}

static void test_1666_is_MDCLXVI(void)
{
   check_conversion(1666, "MDCLXVI");
}

int main(void)
{
   UnityBegin("test_roman_numerals.c");

   RUN_TEST(test_1_is_I);
   RUN_TEST(test_2_is_II);
   RUN_TEST(test_3_is_III);
   RUN_TEST(test_4_is_IV);
   RUN_TEST(test_5_is_V);
   RUN_TEST(test_6_is_VI);
   RUN_TEST(test_9_is_IX);
   RUN_TEST(test_27_is_XXVII);
   RUN_TEST(test_48_is_XLVIII);
   RUN_TEST(test_49_is_XLIX);
   RUN_TEST(test_59_is_LIX);
   RUN_TEST(test_93_is_XCIII);
   RUN_TEST(test_141_is_CXLI);
   RUN_TEST(test_163_is_CLXIII);
   RUN_TEST(test_402_is_CDII);
   RUN_TEST(test_575_is_DLXXV);
   RUN_TEST(test_911_is_CMXI);
   RUN_TEST(test_1024_is_MXXIV);
   RUN_TEST(test_3000_is_MMM);
   RUN_TEST(test_16_is_XVI);
   RUN_TEST(test_66_is_LXVI);
   RUN_TEST(test_166_is_CLXVI);
   RUN_TEST(test_666_is_DCLXVI);
   RUN_TEST(test_1666_is_MDCLXVI);

   return UnityEnd();
}
