#include "all_your_base.h"
#include "../.common/test/catch.hpp"

using namespace std;

//all-your-base exercise test case data version 2.3.0

TEST_CASE("single_bit_one_to_decimal") {
    vector<unsigned int> in_digits{1};
    vector<unsigned int> expected{1};
    vector<unsigned int> out_digits = all_your_base::convert(2, in_digits, 10);

    REQUIRE(expected == out_digits);
}

TEST_CASE("binary_to_single_decimal") {
    vector<unsigned int> in_digits{1, 0, 1};
    vector<unsigned int> expected{5};
    vector<unsigned int> out_digits = all_your_base::convert(2, in_digits, 10);

    REQUIRE(expected == out_digits);
}

TEST_CASE("single_decimal_to_binary") {
    vector<unsigned int> in_digits{5};
    vector<unsigned int> expected{1, 0, 1};
    vector<unsigned int> out_digits = all_your_base::convert(10, in_digits, 2);

    REQUIRE(expected == out_digits);
}

TEST_CASE("binary_to_multiple_decimal") {
    vector<unsigned int> in_digits{1, 0, 1, 0, 1, 0};
    vector<unsigned int> expected{4, 2};
    vector<unsigned int> out_digits = all_your_base::convert(2, in_digits, 10);

    REQUIRE(expected == out_digits);
}

TEST_CASE("decimal_to_binary") {
    vector<unsigned int> in_digits{4, 2};
    vector<unsigned int> expected{1, 0, 1, 0, 1, 0};
    vector<unsigned int> out_digits = all_your_base::convert(10, in_digits, 2);

    REQUIRE(expected == out_digits);
}

TEST_CASE("trinary_to_hexadecimal") {
    vector<unsigned int> in_digits{1, 1, 2, 0};
    vector<unsigned int> expected{2, 10};
    vector<unsigned int> out_digits = all_your_base::convert(3, in_digits, 16);

    REQUIRE(expected == out_digits);
}

TEST_CASE("hexadecimal_to_trinary") {
    vector<unsigned int> in_digits{2, 10};
    vector<unsigned int> expected{1, 1, 2, 0};
    vector<unsigned int> out_digits = all_your_base::convert(16, in_digits, 3);

    REQUIRE(expected == out_digits);
}

TEST_CASE("fifteen_bit_integer") {
    vector<unsigned int> in_digits{3, 46, 60};
    vector<unsigned int> expected{6, 10, 45};
    vector<unsigned int> out_digits = all_your_base::convert(97, in_digits, 73);

    REQUIRE(expected == out_digits);
}

TEST_CASE("empty_list") {
    vector<unsigned int> in_digits{};
    vector<unsigned int> expected{};
    vector<unsigned int> out_digits = all_your_base::convert(2, in_digits, 10);

    REQUIRE(expected == out_digits);
}

TEST_CASE("single_zero") {
    vector<unsigned int> in_digits{0};
    vector<unsigned int> expected{};
    vector<unsigned int> out_digits = all_your_base::convert(10, in_digits, 2);

    REQUIRE(expected == out_digits);
}

TEST_CASE("multiple_zeros") {
    vector<unsigned int> in_digits{0, 0, 0};
    vector<unsigned int> expected{};
    vector<unsigned int> out_digits = all_your_base::convert(10, in_digits, 2);

    REQUIRE(expected == out_digits);
}

TEST_CASE("leading_zeros") {
    vector<unsigned int> in_digits{0, 6, 0};
    vector<unsigned int> expected{4, 2};
    vector<unsigned int> out_digits = all_your_base::convert(7, in_digits, 10);

    REQUIRE(expected == out_digits);
}

TEST_CASE("first_base_is_one") {
    vector<unsigned int> in_digits{};

    REQUIRE_THROWS_AS(all_your_base::convert(1, in_digits, 10), std::invalid_argument);
}

TEST_CASE("first_base_is_zero") {
    vector<unsigned int> in_digits{};

    REQUIRE_THROWS_AS(all_your_base::convert(0, in_digits, 10), std::invalid_argument);
}

TEST_CASE("invalid_positive_digit") {
    vector<unsigned int> in_digits{1, 2, 1, 0, 1, 0};

    REQUIRE_THROWS_AS(all_your_base::convert(2, in_digits, 10), std::invalid_argument);
}

TEST_CASE("second_base_is_one") {
    vector<unsigned int> in_digits{1, 0, 1, 0, 1, 0};

    REQUIRE_THROWS_AS(all_your_base::convert(2, in_digits, 1), std::invalid_argument);
}

TEST_CASE("second_base_is_zero") {
    vector<unsigned int> in_digits{7};

    REQUIRE_THROWS_AS(all_your_base::convert(10, in_digits, 0), std::invalid_argument);
}

TEST_CASE("35!_from_10_to_8") {
    vector<unsigned int> in_digits{ 1, 0, 3, 3, 3, 1, 4, 7, 9, 6, 6, 3, 8, 6, 1, 4, 4, 9, 2, 9, 6, 6, 6,
                                    6, 5, 1, 3, 3, 7, 5, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0 };
    vector<unsigned int> expected{  1, 7, 1, 3, 5, 6, 2, 7, 6, 4, 2, 5, 0, 5, 7, 1, 0, 5, 6, 2, 5, 6, 3,
                                    6, 5, 4, 3, 1, 5, 7, 0, 2, 7, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
    vector<unsigned int> out_digits = all_your_base::convert(10, in_digits, 8);

    REQUIRE(expected == out_digits);
}

TEST_CASE("35!_from_8_to_10") {
    vector<unsigned int> in_digits{ 1, 7, 1, 3, 5, 6, 2, 7, 6, 4, 2, 5, 0, 5, 7, 1, 0, 5, 6, 2, 5, 6, 3,
                                    6, 5, 4, 3, 1, 5, 7, 0, 2, 7, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
    vector<unsigned int> expected { 1, 0, 3, 3, 3, 1, 4, 7, 9, 6, 6, 3, 8, 6, 1, 4, 4, 9, 2, 9, 6, 6, 6,
                                    6, 5, 1, 3, 3, 7, 5, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0 };
    vector<unsigned int> out_digits = all_your_base::convert(8, in_digits, 10);

    REQUIRE(expected == out_digits);
}

TEST_CASE("64!_from_10_to_6") {
    vector<unsigned int> in_digits{ 1, 2, 6, 8, 8, 6, 9, 3, 2, 1, 8, 5, 8, 8, 4, 1, 6, 4, 1, 0, 3, 4, 3, 3,
                                    3, 8, 9, 3, 3, 5, 1, 6, 1, 4, 8, 0, 8, 0, 2, 8, 6, 5, 5, 1, 6, 1, 7, 4,
                                    5, 4, 5, 1, 9, 2, 1, 9, 8, 8, 0, 1, 8, 9, 4, 3, 7, 5, 2, 1, 4, 7, 0, 4,
                                    2, 3, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
    vector<unsigned int> expected{  2, 2, 5, 1, 2, 0, 1, 0, 0, 3, 3, 3, 5, 0, 1, 2, 1, 5, 3, 4, 5, 2, 3, 2,
                                    2, 5, 5, 3, 5, 1, 5, 5, 2, 5, 5, 2, 3, 5, 0, 3, 0, 1, 1, 2, 5, 2, 4, 4,
                                    1, 5, 4, 1, 0, 5, 5, 3, 1, 2, 0, 5, 4, 4, 5, 1, 0, 4, 4, 0, 3, 2, 1, 0,
                                    2, 1, 5, 0, 2, 3, 0, 4, 1, 3, 2, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
    vector<unsigned int> out_digits = all_your_base::convert(10, in_digits, 6);

    REQUIRE(expected == out_digits);
}

TEST_CASE("64!_from_6_to_10") {
    vector<unsigned int> in_digits{ 2, 2, 5, 1, 2, 0, 1, 0, 0, 3, 3, 3, 5, 0, 1, 2, 1, 5, 3, 4, 5, 2, 3, 2,
                                    2, 5, 5, 3, 5, 1, 5, 5, 2, 5, 5, 2, 3, 5, 0, 3, 0, 1, 1, 2, 5, 2, 4, 4,
                                    1, 5, 4, 1, 0, 5, 5, 3, 1, 2, 0, 5, 4, 4, 5, 1, 0, 4, 4, 0, 3, 2, 1, 0,
                                    2, 1, 5, 0, 2, 3, 0, 4, 1, 3, 2, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
    vector<unsigned int> expected { 1, 2, 6, 8, 8, 6, 9, 3, 2, 1, 8, 5, 8, 8, 4, 1, 6, 4, 1, 0, 3, 4, 3, 3,
                                    3, 8, 9, 3, 3, 5, 1, 6, 1, 4, 8, 0, 8, 0, 2, 8, 6, 5, 5, 1, 6, 1, 7, 4,
                                    5, 4, 5, 1, 9, 2, 1, 9, 8, 8, 0, 1, 8, 9, 4, 3, 7, 5, 2, 1, 4, 7, 0, 4,
                                    2, 3, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
    vector<unsigned int> out_digits = all_your_base::convert(6, in_digits, 10);

    REQUIRE(expected == out_digits);
}

TEST_CASE("64!_from_6_to_16") {
    vector<unsigned int> in_digits{ 2, 2, 5, 1, 2, 0, 1, 0, 0, 3, 3, 3, 5, 0, 1, 2, 1, 5, 3, 4, 5, 2, 3, 2,
                                    2, 5, 5, 3, 5, 1, 5, 5, 2, 5, 5, 2, 3, 5, 0, 3, 0, 1, 1, 2, 5, 2, 4, 4,
                                    1, 5, 4, 1, 0, 5, 5, 3, 1, 2, 0, 5, 4, 4, 5, 1, 0, 4, 4, 0, 3, 2, 1, 0,
                                    2, 1, 5, 0, 2, 3, 0, 4, 1, 3, 2, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
    vector<unsigned int> expected { 15, 15, 2, 3, 12, 7, 7, 1, 10, 4, 2, 2, 4, 15, 3, 14, 10, 9, 5, 5, 15,
                                    4, 4, 10, 11, 11, 6, 2, 7, 12, 10, 15, 14, 12, 13, 3, 8, 2, 2, 15, 2,
                                    9, 0, 12, 6, 14, 15, 9, 3, 12, 13, 1, 6, 2, 12, 0, 0, 5, 8, 0, 0, 0,
                                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
    vector<unsigned int> out_digits = all_your_base::convert(6, in_digits, 16);

    REQUIRE(expected == out_digits);
}

#if defined(EXERCISM_RUN_ALL_TESTS)
#endif
