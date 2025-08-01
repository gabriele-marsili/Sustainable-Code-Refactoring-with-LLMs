#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#include "unity.h"
#include "../src/clock.h"

time_text_t actual_time_text;
time_text_t actual_time_text2;

// general routines that test expected results
void test_expected_value(const char *expected_clock_text, int hour, int minute)
{
   memset(actual_time_text, '\0', sizeof(actual_time_text));
   clock(actual_time_text, hour, minute);
   TEST_ASSERT_EQUAL_STRING(expected_clock_text, actual_time_text);
}

void test_time_add_expected_value(const char *expected_clock_text, int hour,
                                  int minute, int minute_offset)
{
   memset(actual_time_text, '\0', sizeof(actual_time_text));
   clock(actual_time_text, hour, minute);
   clock_add(actual_time_text, minute_offset);

   TEST_ASSERT_EQUAL_STRING(expected_clock_text, actual_time_text);
}

void test_time_expected_equality(int hour1, int minute1, int hour2, int minute2,
                                 bool expected_equality)
{
   memset(actual_time_text, '\0', sizeof(actual_time_text));
   memset(actual_time_text2, '\0', sizeof(actual_time_text2));

   clock(actual_time_text, hour1, minute1);
   clock(actual_time_text2, hour2, minute2);

   if (expected_equality) {
      TEST_ASSERT_EQUAL_STRING(actual_time_text, actual_time_text2);
   } else {
      bool result = (0 == strcmp(actual_time_text, actual_time_text2));

      TEST_ASSERT_EQUAL(0, result);
   }
}

// the tests
void test_on_the_hour(void)
{
   int hour = 8;
   int minute = 0;
   char *expected_clock_text = "08:00";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_past_the_hour(void)
{
   int hour = 11;
   int minute = 9;
   char *expected_clock_text = "11:09";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_midnight_is_zero_hours(void)
{
   int hour = 24;
   int minute = 0;
   char *expected_clock_text = "00:00";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_hour_rolls_over(void)
{
   int hour = 25;
   int minute = 0;
   char *expected_clock_text = "01:00";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_hour_rolls_over_continuously(void)
{
   int hour = 100;
   int minute = 0;
   char *expected_clock_text = "04:00";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_sixty_minutes_is_next_hour(void)
{
   int hour = 1;
   int minute = 60;
   char *expected_clock_text = "02:00";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_minutes_roll_over(void)
{
   int hour = 0;
   int minute = 160;
   char *expected_clock_text = "02:40";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_minutes_roll_over_continuously(void)
{
   int hour = 0;
   int minute = 1723;
   char *expected_clock_text = "04:43";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_hour_and_minutes_roll_over(void)
{
   int hour = 25;
   int minute = 160;
   char *expected_clock_text = "03:40";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_hour_and_minutes_roll_over_continuously(void)
{
   int hour = 201;
   int minute = 3001;
   char *expected_clock_text = "11:01";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_hour_and_minutes_roll_over_to_exactly_midnight(void)
{
   int hour = 72;
   int minute = 8640;
   char *expected_clock_text = "00:00";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_negative_hour(void)
{
   int hour = -1;
   int minute = 15;
   char *expected_clock_text = "23:15";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_negative_hour_rolls_over(void)
{
   int hour = -25;
   int minute = 0;
   char *expected_clock_text = "23:00";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_negative_hour_rolls_over_continuously(void)
{
   int hour = -91;
   int minute = 0;
   char *expected_clock_text = "05:00";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_negative_minutes(void)
{
   int hour = 1;
   int minute = -40;
   char *expected_clock_text = "00:20";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_negative_minutes_roll_over(void)
{
   int hour = 1;
   int minute = -160;
   char *expected_clock_text = "22:20";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_negative_minutes_roll_over_continuously(void)
{
   int hour = 1;
   int minute = -4820;
   char *expected_clock_text = "16:40";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_negative_hour_and_minutes_both_roll_over(void)
{
   int hour = -25;
   int minute = -160;
   char *expected_clock_text = "20:20";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_negative_hour_and_minutes_both_roll_over_continuously(void)
{
   int hour = -121;
   int minute = -5810;
   char *expected_clock_text = "22:10";

   test_expected_value(expected_clock_text, hour, minute);
}

void test_add_minutes(void)
{
   int hour = 10;
   int minute = 0;
   int minute_offset = 3;
   char *expected_clock_text = "10:03";

   test_time_add_expected_value(expected_clock_text, hour, minute,
                                minute_offset);
}

void test_add_no_minutes(void)
{
   int hour = 6;
   int minute = 41;
   int minute_offset = 0;
   char *expected_clock_text = "06:41";

   test_time_add_expected_value(expected_clock_text, hour, minute,
                                minute_offset);
}

void test_add_to_next_hour(void)
{
   int hour = 0;
   int minute = 45;
   int minute_offset = 40;
   char *expected_clock_text = "01:25";

   test_time_add_expected_value(expected_clock_text, hour, minute,
                                minute_offset);
}

void test_add_more_than_one_hour(void)
{
   int hour = 10;
   int minute = 0;
   int minute_offset = 61;
   char *expected_clock_text = "11:01";

   test_time_add_expected_value(expected_clock_text, hour, minute,
                                minute_offset);
}

void test_add_more_than_two_hours_with_carry(void)
{
   int hour = 0;
   int minute = 45;
   int minute_offset = 160;
   char *expected_clock_text = "03:25";

   test_time_add_expected_value(expected_clock_text, hour, minute,
                                minute_offset);
}

void test_add_across_midnight(void)
{
   int hour = 23;
   int minute = 59;
   int minute_offset = 2;
   char *expected_clock_text = "00:01";

   test_time_add_expected_value(expected_clock_text, hour, minute,
                                minute_offset);
}

void test_add_more_than_one_day(void)
{
   int hour = 5;
   int minute = 32;
   int minute_offset = 1500;
   char *expected_clock_text = "06:32";

   test_time_add_expected_value(expected_clock_text, hour, minute,
                                minute_offset);
}

void test_add_more_than_two_days(void)
{
   int hour = 1;
   int minute = 1;
   int minute_offset = 3500;
   char *expected_clock_text = "11:21";

   test_time_add_expected_value(expected_clock_text, hour, minute,
                                minute_offset);
}

void test_subtract_minutes(void)
{
   int hour = 10;
   int minute = 3;
   int minute_offset = -3;
   char *expected_clock_text = "10:00";

   test_time_add_expected_value(expected_clock_text, hour, minute,
                                minute_offset);
}

void test_subtract_to_previous_hour(void)
{
   int hour = 10;
   int minute = 3;
   int minute_offset = -30;
   char *expected_clock_text = "09:33";

   test_time_add_expected_value(expected_clock_text, hour, minute,
                                minute_offset);
}

void test_subtract_more_than_an_hour(void)
{
   int hour = 10;
   int minute = 3;
   int minute_offset = -70;
   char *expected_clock_text = "08:53";

   test_time_add_expected_value(expected_clock_text, hour, minute,
                                minute_offset);
}

void test_subtract_across_midnight(void)
{
   int hour = 0;
   int minute = 3;
   int minute_offset = -4;
   char *expected_clock_text = "23:59";

   test_time_add_expected_value(expected_clock_text, hour, minute,
                                minute_offset);
}

void test_subtract_more_than_two_hours(void)
{
   int hour = 0;
   int minute = 0;
   int minute_offset = -160;
   char *expected_clock_text = "21:20";

   test_time_add_expected_value(expected_clock_text, hour, minute,
                                minute_offset);
}

void test_subtract_more_than_two_hours_with_borrow(void)
{
   int hour = 6;
   int minute = 15;
   int minute_offset = -160;
   char *expected_clock_text = "03:35";

   test_time_add_expected_value(expected_clock_text, hour, minute,
                                minute_offset);
}

void test_subtract_more_than_one_day(void)
{
   int hour = 5;
   int minute = 32;
   int minute_offset = -1500;
   char *expected_clock_text = "04:32";

   test_time_add_expected_value(expected_clock_text, hour, minute,
                                minute_offset);
}

void test_subtract_more_than_two_days(void)
{
   int hour = 2;
   int minute = 20;
   int minute_offset = -3000;
   char *expected_clock_text = "00:20";

   test_time_add_expected_value(expected_clock_text, hour, minute,
                                minute_offset);
}

// these tests check equality.
// Part of standard test collection
// Included even though they don't make much sense in C

// // trying it with XMACROS !
#define EXPAND_EQUALITY_TEST_AS_TEST(test_name, hour1, minute1, hour2, minute2, expected_equality)\
   void test_name(void)\
   {\
   test_time_expected_equality(hour1, minute1, hour2, minute2, expected_equality);\
   }\

// below expands to multiple routines...that are all designed to test the equality of 2 different
// clock representations to see if they are the same or not
// that 2 clocks are equal...
// the fields are:
//    test name, time1_hour, time1_minute, time2_hour, time2_minute, (time1 == time2)

#define EQUALITY_TESTS(ENTRY) \
   ENTRY(test_clocks_with_same_time,      15,   37,   15, 37, true)\
   ENTRY(test_clocks_a_minute_apart,      15,   36,   15, 37, false)\
   ENTRY(test_clocks_an_hour_apart,       15,   37,   14, 37, false)\
   ENTRY(test_clocks_with_hour_overflow,  10,   37,   34, 37, true)\
   ENTRY(test_clocks_with_hour_overflow_by_several_days,  3,   11,   99, 11, true)\
   ENTRY(test_clocks_with_negative_hour,  22,   40,   -2, 40, true)\
   ENTRY(test_clocks_with_negative_hour_that_wraps,  17,   3,   -31, 3, true)\
   ENTRY(test_clocks_with_negative_hour_that_wraps_multiple_times,  13,   49, -83, 49, true)\
   ENTRY(test_clocks_with_minute_overflow,  0,  1,   0, 1441, true)\
   ENTRY(test_clocks_with_minute_overflow_by_several_days,  2,  2,   2, 4322, true)\
   ENTRY(test_clocks_with_negative_minute,  2,  40,   3, -20, true)\
   ENTRY(test_clocks_with_negative_minute_that_wraps,  4,  10,   5, -1490, true)\
   ENTRY(test_clocks_with_negative_minute_that_wraps_multiple_times,  6,  15,   6, -4305, true)\
   ENTRY(test_clocks_with_negative_hours_and_minutes,  7,  32,   -12, -268, true)\
   ENTRY(test_clocks_with_negative_hours_and_minutes_that_wrap,  18,  7,   -54, -11513, true)\

EQUALITY_TESTS(EXPAND_EQUALITY_TEST_AS_TEST)

int main(void)
{
   UnityBegin("clock.c");

   RUN_TEST(test_on_the_hour);
   RUN_TEST(test_past_the_hour);
   RUN_TEST(test_midnight_is_zero_hours);
   RUN_TEST(test_hour_rolls_over);
   RUN_TEST(test_hour_rolls_over_continuously);
   RUN_TEST(test_sixty_minutes_is_next_hour);
   RUN_TEST(test_minutes_roll_over);
   RUN_TEST(test_minutes_roll_over_continuously);
   RUN_TEST(test_hour_and_minutes_roll_over);
   RUN_TEST(test_hour_and_minutes_roll_over_continuously);
   RUN_TEST(test_hour_and_minutes_roll_over_to_exactly_midnight);
   RUN_TEST(test_negative_hour);
   RUN_TEST(test_negative_hour_rolls_over);
   RUN_TEST(test_negative_hour_rolls_over_continuously);
   RUN_TEST(test_negative_minutes);
   RUN_TEST(test_negative_minutes_roll_over);
   RUN_TEST(test_negative_minutes_roll_over_continuously);
   RUN_TEST(test_negative_hour_and_minutes_both_roll_over);
   RUN_TEST(test_negative_hour_and_minutes_both_roll_over_continuously);
   RUN_TEST(test_add_minutes);
   RUN_TEST(test_add_no_minutes);
   RUN_TEST(test_add_to_next_hour);
   RUN_TEST(test_add_more_than_one_hour);
   RUN_TEST(test_add_more_than_two_hours_with_carry);
   RUN_TEST(test_add_across_midnight);
   RUN_TEST(test_add_more_than_one_day);
   RUN_TEST(test_add_more_than_two_days);
   RUN_TEST(test_subtract_minutes);
   RUN_TEST(test_subtract_to_previous_hour);
   RUN_TEST(test_subtract_more_than_an_hour);
   RUN_TEST(test_subtract_across_midnight);
   RUN_TEST(test_subtract_more_than_two_hours);
   RUN_TEST(test_subtract_more_than_two_hours_with_borrow);
   RUN_TEST(test_subtract_more_than_one_day);
   RUN_TEST(test_subtract_more_than_two_days);

   RUN_TEST(test_clocks_with_same_time);
   RUN_TEST(test_clocks_a_minute_apart);
   RUN_TEST(test_clocks_an_hour_apart);
   RUN_TEST(test_clocks_with_hour_overflow);
   RUN_TEST(test_clocks_with_hour_overflow_by_several_days);
   RUN_TEST(test_clocks_with_negative_hour);
   RUN_TEST(test_clocks_with_negative_hour_that_wraps);
   RUN_TEST(test_clocks_with_negative_hour_that_wraps_multiple_times);
   RUN_TEST(test_clocks_with_minute_overflow);
   RUN_TEST(test_clocks_with_minute_overflow_by_several_days);
   RUN_TEST(test_clocks_with_negative_minute);
   RUN_TEST(test_clocks_with_negative_minute_that_wraps);
   RUN_TEST(test_clocks_with_negative_minute_that_wraps_multiple_times);
   RUN_TEST(test_clocks_with_negative_hours_and_minutes);
   RUN_TEST(test_clocks_with_negative_hours_and_minutes_that_wrap);

   UnityEnd();
   return 0;
}
