#include <stdint.h>
#include <stdlib.h>

#include "beer_song.h"
#include "unity.h"

#define MAX_LINE_LENGTH (1024)
#define MAX_LINE_COUNT (299)

char **actual_song;

static char **create_empty_song(uint16_t expected_line_count);
static void delete_song(uint16_t expected_line_count, char **actual_song);

void setUp(void) { actual_song = create_empty_song(MAX_LINE_COUNT); }

void tearDown(void) { delete_song(MAX_LINE_COUNT, actual_song); }

static char **create_empty_song(uint16_t expected_line_count) {
    char **actual_song = calloc(expected_line_count, sizeof(*actual_song));
    for (size_t i = 0; i < expected_line_count; ++i)
        actual_song[i] = calloc(MAX_LINE_LENGTH, sizeof(**actual_song));
    return actual_song;
}

static void delete_song(uint16_t expected_line_count, char **actual_song) {
    for (size_t i = 0; i < expected_line_count; ++i) free(actual_song[i]);
    free(actual_song);
}

static void check_song(uint16_t expected_line_count,
                       const char expected_song[][MAX_LINE_LENGTH],
                       char **actual) {
    for (size_t i = 0; i < expected_line_count; ++i)
        TEST_ASSERT_EQUAL_STRING(expected_song[i], actual[i]);
    for (size_t i = expected_line_count; i < MAX_LINE_COUNT; ++i)
        TEST_ASSERT_EQUAL_STRING("", actual_song[i]);
}

static void test_first_generic_verse(void) {
    uint16_t expected_line_count = 2;
    const char expected_song[][MAX_LINE_LENGTH] = {
        "99 bottles of beer on the wall, 99 bottles of beer.",
        "Take one down and pass it around, 98 bottles of beer on the wall."};

    recite(99, 1, actual_song);

    check_song(expected_line_count, expected_song, actual_song);
}

static void test_last_generic_verse(void) {
    uint16_t expected_line_count = 2;
    const char expected_song[][MAX_LINE_LENGTH] = {
        "3 bottles of beer on the wall, 3 bottles of beer.",
        "Take one down and pass it around, 2 bottles of beer on the wall."};

    recite(3, 1, actual_song);

    check_song(expected_line_count, expected_song, actual_song);
}

static void test_verse_with_2_bottles(void) {
    uint16_t expected_line_count = 2;
    const char expected_song[][MAX_LINE_LENGTH] = {
        "2 bottles of beer on the wall, 2 bottles of beer.",
        "Take one down and pass it around, 1 bottle of beer on the wall."};

    recite(2, 1, actual_song);

    check_song(expected_line_count, expected_song, actual_song);
}

static void test_verse_with_1_bottle(void) {
    uint16_t expected_line_count = 2;
    const char expected_song[][MAX_LINE_LENGTH] = {
        "1 bottle of beer on the wall, 1 bottle of beer.",
        "Take it down and pass it around, no more bottles of beer on the "
        "wall."};

    recite(1, 1, actual_song);

    check_song(expected_line_count, expected_song, actual_song);
}

static void test_verse_with_0_bottles(void) {
    uint16_t expected_line_count = 2;
    const char expected_song[][MAX_LINE_LENGTH] = {
        "No more bottles of beer on the wall, no more bottles of beer.",
        "Go to the store and buy some more, 99 bottles of beer on the wall."};

    recite(0, 1, actual_song);

    check_song(expected_line_count, expected_song, actual_song);
}

static void test_first_two_verses(void) {
    uint16_t expected_line_count = 5;
    const char expected_song[][MAX_LINE_LENGTH] = {
        "99 bottles of beer on the wall, 99 bottles of beer.",
        "Take one down and pass it around, 98 bottles of beer on the wall.", "",
        "98 bottles of beer on the wall, 98 bottles of beer.",
        "Take one down and pass it around, 97 bottles of beer on the wall."};

    recite(99, 2, actual_song);

    check_song(expected_line_count, expected_song, actual_song);
}

static void test_last_three_verses(void) {
    uint16_t expected_line_count = 8;
    const char expected_song[][MAX_LINE_LENGTH] = {
        "2 bottles of beer on the wall, 2 bottles of beer.",
        "Take one down and pass it around, 1 bottle of beer on the wall.",
        "",
        "1 bottle of beer on the wall, 1 bottle of beer.",
        "Take it down and pass it around, no more bottles of beer on the wall.",
        "",
        "No more bottles of beer on the wall, no more bottles of beer.",
        "Go to the store and buy some more, 99 bottles of beer on the wall."};

    recite(2, 3, actual_song);

    check_song(expected_line_count, expected_song, actual_song);
}

static void test_all_verses(void) {
    uint16_t expected_line_count = 299;
    const char expected_song[][MAX_LINE_LENGTH] = {
        "99 bottles of beer on the wall, 99 bottles of beer.",
        "Take one down and pass it around, 98 bottles of beer on the wall.",
        "",
        "98 bottles of beer on the wall, 98 bottles of beer.",
        "Take one down and pass it around, 97 bottles of beer on the wall.",
        "",
        "97 bottles of beer on the wall, 97 bottles of beer.",
        "Take one down and pass it around, 96 bottles of beer on the wall.",
        "",
        "96 bottles of beer on the wall, 96 bottles of beer.",
        "Take one down and pass it around, 95 bottles of beer on the wall.",
        "",
        "95 bottles of beer on the wall, 95 bottles of beer.",
        "Take one down and pass it around, 94 bottles of beer on the wall.",
        "",
        "94 bottles of beer on the wall, 94 bottles of beer.",
        "Take one down and pass it around, 93 bottles of beer on the wall.",
        "",
        "93 bottles of beer on the wall, 93 bottles of beer.",
        "Take one down and pass it around, 92 bottles of beer on the wall.",
        "",
        "92 bottles of beer on the wall, 92 bottles of beer.",
        "Take one down and pass it around, 91 bottles of beer on the wall.",
        "",
        "91 bottles of beer on the wall, 91 bottles of beer.",
        "Take one down and pass it around, 90 bottles of beer on the wall.",
        "",
        "90 bottles of beer on the wall, 90 bottles of beer.",
        "Take one down and pass it around, 89 bottles of beer on the wall.",
        "",
        "89 bottles of beer on the wall, 89 bottles of beer.",
        "Take one down and pass it around, 88 bottles of beer on the wall.",
        "",
        "88 bottles of beer on the wall, 88 bottles of beer.",
        "Take one down and pass it around, 87 bottles of beer on the wall.",
        "",
        "87 bottles of beer on the wall, 87 bottles of beer.",
        "Take one down and pass it around, 86 bottles of beer on the wall.",
        "",
        "86 bottles of beer on the wall, 86 bottles of beer.",
        "Take one down and pass it around, 85 bottles of beer on the wall.",
        "",
        "85 bottles of beer on the wall, 85 bottles of beer.",
        "Take one down and pass it around, 84 bottles of beer on the wall.",
        "",
        "84 bottles of beer on the wall, 84 bottles of beer.",
        "Take one down and pass it around, 83 bottles of beer on the wall.",
        "",
        "83 bottles of beer on the wall, 83 bottles of beer.",
        "Take one down and pass it around, 82 bottles of beer on the wall.",
        "",
        "82 bottles of beer on the wall, 82 bottles of beer.",
        "Take one down and pass it around, 81 bottles of beer on the wall.",
        "",
        "81 bottles of beer on the wall, 81 bottles of beer.",
        "Take one down and pass it around, 80 bottles of beer on the wall.",
        "",
        "80 bottles of beer on the wall, 80 bottles of beer.",
        "Take one down and pass it around, 79 bottles of beer on the wall.",
        "",
        "79 bottles of beer on the wall, 79 bottles of beer.",
        "Take one down and pass it around, 78 bottles of beer on the wall.",
        "",
        "78 bottles of beer on the wall, 78 bottles of beer.",
        "Take one down and pass it around, 77 bottles of beer on the wall.",
        "",
        "77 bottles of beer on the wall, 77 bottles of beer.",
        "Take one down and pass it around, 76 bottles of beer on the wall.",
        "",
        "76 bottles of beer on the wall, 76 bottles of beer.",
        "Take one down and pass it around, 75 bottles of beer on the wall.",
        "",
        "75 bottles of beer on the wall, 75 bottles of beer.",
        "Take one down and pass it around, 74 bottles of beer on the wall.",
        "",
        "74 bottles of beer on the wall, 74 bottles of beer.",
        "Take one down and pass it around, 73 bottles of beer on the wall.",
        "",
        "73 bottles of beer on the wall, 73 bottles of beer.",
        "Take one down and pass it around, 72 bottles of beer on the wall.",
        "",
        "72 bottles of beer on the wall, 72 bottles of beer.",
        "Take one down and pass it around, 71 bottles of beer on the wall.",
        "",
        "71 bottles of beer on the wall, 71 bottles of beer.",
        "Take one down and pass it around, 70 bottles of beer on the wall.",
        "",
        "70 bottles of beer on the wall, 70 bottles of beer.",
        "Take one down and pass it around, 69 bottles of beer on the wall.",
        "",
        "69 bottles of beer on the wall, 69 bottles of beer.",
        "Take one down and pass it around, 68 bottles of beer on the wall.",
        "",
        "68 bottles of beer on the wall, 68 bottles of beer.",
        "Take one down and pass it around, 67 bottles of beer on the wall.",
        "",
        "67 bottles of beer on the wall, 67 bottles of beer.",
        "Take one down and pass it around, 66 bottles of beer on the wall.",
        "",
        "66 bottles of beer on the wall, 66 bottles of beer.",
        "Take one down and pass it around, 65 bottles of beer on the wall.",
        "",
        "65 bottles of beer on the wall, 65 bottles of beer.",
        "Take one down and pass it around, 64 bottles of beer on the wall.",
        "",
        "64 bottles of beer on the wall, 64 bottles of beer.",
        "Take one down and pass it around, 63 bottles of beer on the wall.",
        "",
        "63 bottles of beer on the wall, 63 bottles of beer.",
        "Take one down and pass it around, 62 bottles of beer on the wall.",
        "",
        "62 bottles of beer on the wall, 62 bottles of beer.",
        "Take one down and pass it around, 61 bottles of beer on the wall.",
        "",
        "61 bottles of beer on the wall, 61 bottles of beer.",
        "Take one down and pass it around, 60 bottles of beer on the wall.",
        "",
        "60 bottles of beer on the wall, 60 bottles of beer.",
        "Take one down and pass it around, 59 bottles of beer on the wall.",
        "",
        "59 bottles of beer on the wall, 59 bottles of beer.",
        "Take one down and pass it around, 58 bottles of beer on the wall.",
        "",
        "58 bottles of beer on the wall, 58 bottles of beer.",
        "Take one down and pass it around, 57 bottles of beer on the wall.",
        "",
        "57 bottles of beer on the wall, 57 bottles of beer.",
        "Take one down and pass it around, 56 bottles of beer on the wall.",
        "",
        "56 bottles of beer on the wall, 56 bottles of beer.",
        "Take one down and pass it around, 55 bottles of beer on the wall.",
        "",
        "55 bottles of beer on the wall, 55 bottles of beer.",
        "Take one down and pass it around, 54 bottles of beer on the wall.",
        "",
        "54 bottles of beer on the wall, 54 bottles of beer.",
        "Take one down and pass it around, 53 bottles of beer on the wall.",
        "",
        "53 bottles of beer on the wall, 53 bottles of beer.",
        "Take one down and pass it around, 52 bottles of beer on the wall.",
        "",
        "52 bottles of beer on the wall, 52 bottles of beer.",
        "Take one down and pass it around, 51 bottles of beer on the wall.",
        "",
        "51 bottles of beer on the wall, 51 bottles of beer.",
        "Take one down and pass it around, 50 bottles of beer on the wall.",
        "",
        "50 bottles of beer on the wall, 50 bottles of beer.",
        "Take one down and pass it around, 49 bottles of beer on the wall.",
        "",
        "49 bottles of beer on the wall, 49 bottles of beer.",
        "Take one down and pass it around, 48 bottles of beer on the wall.",
        "",
        "48 bottles of beer on the wall, 48 bottles of beer.",
        "Take one down and pass it around, 47 bottles of beer on the wall.",
        "",
        "47 bottles of beer on the wall, 47 bottles of beer.",
        "Take one down and pass it around, 46 bottles of beer on the wall.",
        "",
        "46 bottles of beer on the wall, 46 bottles of beer.",
        "Take one down and pass it around, 45 bottles of beer on the wall.",
        "",
        "45 bottles of beer on the wall, 45 bottles of beer.",
        "Take one down and pass it around, 44 bottles of beer on the wall.",
        "",
        "44 bottles of beer on the wall, 44 bottles of beer.",
        "Take one down and pass it around, 43 bottles of beer on the wall.",
        "",
        "43 bottles of beer on the wall, 43 bottles of beer.",
        "Take one down and pass it around, 42 bottles of beer on the wall.",
        "",
        "42 bottles of beer on the wall, 42 bottles of beer.",
        "Take one down and pass it around, 41 bottles of beer on the wall.",
        "",
        "41 bottles of beer on the wall, 41 bottles of beer.",
        "Take one down and pass it around, 40 bottles of beer on the wall.",
        "",
        "40 bottles of beer on the wall, 40 bottles of beer.",
        "Take one down and pass it around, 39 bottles of beer on the wall.",
        "",
        "39 bottles of beer on the wall, 39 bottles of beer.",
        "Take one down and pass it around, 38 bottles of beer on the wall.",
        "",
        "38 bottles of beer on the wall, 38 bottles of beer.",
        "Take one down and pass it around, 37 bottles of beer on the wall.",
        "",
        "37 bottles of beer on the wall, 37 bottles of beer.",
        "Take one down and pass it around, 36 bottles of beer on the wall.",
        "",
        "36 bottles of beer on the wall, 36 bottles of beer.",
        "Take one down and pass it around, 35 bottles of beer on the wall.",
        "",
        "35 bottles of beer on the wall, 35 bottles of beer.",
        "Take one down and pass it around, 34 bottles of beer on the wall.",
        "",
        "34 bottles of beer on the wall, 34 bottles of beer.",
        "Take one down and pass it around, 33 bottles of beer on the wall.",
        "",
        "33 bottles of beer on the wall, 33 bottles of beer.",
        "Take one down and pass it around, 32 bottles of beer on the wall.",
        "",
        "32 bottles of beer on the wall, 32 bottles of beer.",
        "Take one down and pass it around, 31 bottles of beer on the wall.",
        "",
        "31 bottles of beer on the wall, 31 bottles of beer.",
        "Take one down and pass it around, 30 bottles of beer on the wall.",
        "",
        "30 bottles of beer on the wall, 30 bottles of beer.",
        "Take one down and pass it around, 29 bottles of beer on the wall.",
        "",
        "29 bottles of beer on the wall, 29 bottles of beer.",
        "Take one down and pass it around, 28 bottles of beer on the wall.",
        "",
        "28 bottles of beer on the wall, 28 bottles of beer.",
        "Take one down and pass it around, 27 bottles of beer on the wall.",
        "",
        "27 bottles of beer on the wall, 27 bottles of beer.",
        "Take one down and pass it around, 26 bottles of beer on the wall.",
        "",
        "26 bottles of beer on the wall, 26 bottles of beer.",
        "Take one down and pass it around, 25 bottles of beer on the wall.",
        "",
        "25 bottles of beer on the wall, 25 bottles of beer.",
        "Take one down and pass it around, 24 bottles of beer on the wall.",
        "",
        "24 bottles of beer on the wall, 24 bottles of beer.",
        "Take one down and pass it around, 23 bottles of beer on the wall.",
        "",
        "23 bottles of beer on the wall, 23 bottles of beer.",
        "Take one down and pass it around, 22 bottles of beer on the wall.",
        "",
        "22 bottles of beer on the wall, 22 bottles of beer.",
        "Take one down and pass it around, 21 bottles of beer on the wall.",
        "",
        "21 bottles of beer on the wall, 21 bottles of beer.",
        "Take one down and pass it around, 20 bottles of beer on the wall.",
        "",
        "20 bottles of beer on the wall, 20 bottles of beer.",
        "Take one down and pass it around, 19 bottles of beer on the wall.",
        "",
        "19 bottles of beer on the wall, 19 bottles of beer.",
        "Take one down and pass it around, 18 bottles of beer on the wall.",
        "",
        "18 bottles of beer on the wall, 18 bottles of beer.",
        "Take one down and pass it around, 17 bottles of beer on the wall.",
        "",
        "17 bottles of beer on the wall, 17 bottles of beer.",
        "Take one down and pass it around, 16 bottles of beer on the wall.",
        "",
        "16 bottles of beer on the wall, 16 bottles of beer.",
        "Take one down and pass it around, 15 bottles of beer on the wall.",
        "",
        "15 bottles of beer on the wall, 15 bottles of beer.",
        "Take one down and pass it around, 14 bottles of beer on the wall.",
        "",
        "14 bottles of beer on the wall, 14 bottles of beer.",
        "Take one down and pass it around, 13 bottles of beer on the wall.",
        "",
        "13 bottles of beer on the wall, 13 bottles of beer.",
        "Take one down and pass it around, 12 bottles of beer on the wall.",
        "",
        "12 bottles of beer on the wall, 12 bottles of beer.",
        "Take one down and pass it around, 11 bottles of beer on the wall.",
        "",
        "11 bottles of beer on the wall, 11 bottles of beer.",
        "Take one down and pass it around, 10 bottles of beer on the wall.",
        "",
        "10 bottles of beer on the wall, 10 bottles of beer.",
        "Take one down and pass it around, 9 bottles of beer on the wall.",
        "",
        "9 bottles of beer on the wall, 9 bottles of beer.",
        "Take one down and pass it around, 8 bottles of beer on the wall.",
        "",
        "8 bottles of beer on the wall, 8 bottles of beer.",
        "Take one down and pass it around, 7 bottles of beer on the wall.",
        "",
        "7 bottles of beer on the wall, 7 bottles of beer.",
        "Take one down and pass it around, 6 bottles of beer on the wall.",
        "",
        "6 bottles of beer on the wall, 6 bottles of beer.",
        "Take one down and pass it around, 5 bottles of beer on the wall.",
        "",
        "5 bottles of beer on the wall, 5 bottles of beer.",
        "Take one down and pass it around, 4 bottles of beer on the wall.",
        "",
        "4 bottles of beer on the wall, 4 bottles of beer.",
        "Take one down and pass it around, 3 bottles of beer on the wall.",
        "",
        "3 bottles of beer on the wall, 3 bottles of beer.",
        "Take one down and pass it around, 2 bottles of beer on the wall.",
        "",
        "2 bottles of beer on the wall, 2 bottles of beer.",
        "Take one down and pass it around, 1 bottle of beer on the wall.",
        "",
        "1 bottle of beer on the wall, 1 bottle of beer.",
        "Take it down and pass it around, no more bottles of beer on the wall.",
        "",
        "No more bottles of beer on the wall, no more bottles of beer.",
        "Go to the store and buy some more, 99 bottles of beer on the wall."};

    recite(99, 100, actual_song);

    check_song(expected_line_count, expected_song, actual_song);
}

int main(void) {
    UNITY_BEGIN();

    RUN_TEST(test_first_generic_verse);
    RUN_TEST(test_last_generic_verse);
    RUN_TEST(test_verse_with_2_bottles);
    RUN_TEST(test_verse_with_1_bottle);
    RUN_TEST(test_verse_with_0_bottles);
    RUN_TEST(test_first_two_verses);
    RUN_TEST(test_last_three_verses);
    RUN_TEST(test_all_verses);

    return UNITY_END();
}
