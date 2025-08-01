#include "unity.h"
#include "../src/acronym.h"
#include <stdlib.h>
#include <string.h>

void setUp(void)
{
}

void tearDown(void)
{
}

static void test_abbreviation(char *phrase, char *expected)
{
   char *actual = abbreviate(phrase);
   TEST_ASSERT_EQUAL_STRING(expected, actual);
   free(actual);
}

static void test_null_string(void)
{
   char *phrase = NULL;
   char *expected = NULL;
   test_abbreviation(phrase, expected);
}

static void test_basic_abbreviation(void)
{
   char *phrase = "Portable Network Graphics";
   char *expected = "PNG";
   test_abbreviation(phrase, expected);
}

static void test_lower_case_words(void)
{
   char *phrase = "Ruby on Rails";
   char *expected = "ROR";
   test_abbreviation(phrase, expected);
}

static void test_punctuation(void)
{
   char *phrase = "First In, First Out";
   char *expected = "FIFO";
   test_abbreviation(phrase, expected);
}

static void test_non_acronym_all_caps_words(void)
{
   char *phrase = "GNU Image Manipulation Program";
   char *expected = "GIMP";
   test_abbreviation(phrase, expected);
}

static void test_hyphenated(void)
{
   char *phrase = "Complementary metal-oxide semiconductor";
   char *expected = "CMOS";
   test_abbreviation(phrase, expected);
}

static void test_all_caps_words(void)
{
   char *phrase = "PHP: Hypertext Preprocessor";
   char *expected = "PHP";
   test_abbreviation(phrase, expected);
}

static void test_empty_string(void)
{
   char *phrase = "";
   char *expected = NULL;
   test_abbreviation(phrase, expected);
}

static void test_all_words_starting_with_lowercase(void)
{
   char *phrase = "for what it's worth";
   char *expected = "FWIW";
   test_abbreviation(phrase, expected);
}

static void test_long_abbreviation(void)
{
   char *phrase = "Rolling On The Floor Laughing So Hard "
       "That My Dogs Came Over And Licked Me";
   char *expected = "ROTFLSHTMDCOALM";
   test_abbreviation(phrase, expected);
}

int main(void)
{
   UnityBegin("test/test_acronym.c");

   RUN_TEST(test_basic_abbreviation);
   RUN_TEST(test_null_string);
   RUN_TEST(test_lower_case_words);
   RUN_TEST(test_punctuation);
   RUN_TEST(test_non_acronym_all_caps_words);
   RUN_TEST(test_hyphenated);
   RUN_TEST(test_all_caps_words);
   RUN_TEST(test_empty_string);
   RUN_TEST(test_all_words_starting_with_lowercase);
   RUN_TEST(test_long_abbreviation);
   return UnityEnd();
}
