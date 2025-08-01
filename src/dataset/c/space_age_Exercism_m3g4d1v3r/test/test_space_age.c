#include "space_age.h"
#include "unity.h"

void setUp(void) {}

void tearDown(void) {}

static void test_age_on_earth(void) {
    TEST_ASSERT_FLOAT_WITHIN(1, 31.69, age(EARTH, 1000000000));
}

static void test_age_on_mercury(void) {
    TEST_ASSERT_FLOAT_WITHIN(3, 280.88, age(MERCURY, 2134835688));
}

static void test_age_on_venus(void) {
    TEST_ASSERT_FLOAT_WITHIN(1, 9.78, age(VENUS, 189839836));
}

static void test_age_on_mars(void) {
    TEST_ASSERT_FLOAT_WITHIN(1, 35.88, age(MARS, 2129871239));
}

static void test_age_on_jupiter(void) {
    TEST_ASSERT_FLOAT_WITHIN(0.1, 2.41, age(JUPITER, 901876382));
}

static void test_age_on_saturn(void) {
    TEST_ASSERT_FLOAT_WITHIN(0.1, 2.15, age(SATURN, 2000000000));
}

static void test_age_on_uranus(void) {
    TEST_ASSERT_FLOAT_WITHIN(0.1, 0.46, age(URANUS, 1210123456));
}

static void test_age_on_neptune(void) {
    TEST_ASSERT_FLOAT_WITHIN(0.1, 0.35, age(NEPTUNE, 1821023456));
}

static void test_invalid_planet_causes_error(void) {
    // Here, we chose -1 to indicate an error
    // (because all valid inputs would result in positive ages)
    TEST_ASSERT_EQUAL_FLOAT(-1.0, age((planet_t)-1, 680804807));
}

int main(void) {
    UNITY_BEGIN();

    RUN_TEST(test_age_on_earth);
    RUN_TEST(test_age_on_mercury);
    RUN_TEST(test_age_on_venus);
    RUN_TEST(test_age_on_mars);
    RUN_TEST(test_age_on_jupiter);
    RUN_TEST(test_age_on_saturn);
    RUN_TEST(test_age_on_uranus);
    RUN_TEST(test_age_on_neptune);
    RUN_TEST(test_invalid_planet_causes_error);

    return UNITY_END();
}
