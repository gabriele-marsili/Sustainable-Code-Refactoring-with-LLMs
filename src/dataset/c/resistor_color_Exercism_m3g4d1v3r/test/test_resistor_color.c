#include "resistor_color.h"
#include "unity.h"

#define ARRAY_LENGTH(A) (sizeof(A) / sizeof(A[0]))

void setUp(void) {}

void tearDown(void) {}

static void test_black(void) { TEST_ASSERT_EQUAL_UINT16(0, color_code(BLACK)); }

static void test_white(void) { TEST_ASSERT_EQUAL_UINT16(9, color_code(WHITE)); }

static void test_orange(void) {
    TEST_ASSERT_EQUAL_UINT16(3, color_code(ORANGE));
}

static void test_colors(void) {
    const resistor_band_t expected[] = {BLACK, BROWN, RED,    ORANGE, YELLOW,
                                        GREEN, BLUE,  VIOLET, GREY,   WHITE};
    const resistor_band_t *actual = colors();
    TEST_ASSERT_EQUAL_INT_ARRAY(expected, actual, ARRAY_LENGTH(expected));
}

int main(void) {
    UNITY_BEGIN();

    RUN_TEST(test_black);
    RUN_TEST(test_white);
    RUN_TEST(test_orange);
    RUN_TEST(test_colors);

    return UNITY_END();
}
