#include <stdlib.h>
#include <string.h>

#include "nucleotide_count.h"
#include "unity.h"

void setUp(void) {}

void tearDown(void) {}

static void test_strand_count(const char *dna_strand, const char *expected) {
    char *actual_count = count(dna_strand);

    TEST_ASSERT_TRUE(strcmp(actual_count, expected) == 0);
    free(actual_count);
}

static void test_empty_strand(void) {
    const char *dna_strand = "";
    const char *expected = "A:0 C:0 G:0 T:0";

    test_strand_count(dna_strand, expected);
}

static void test_can_count_one_nucleotide_in_single_character_input(void) {
    const char *dna_strand = "G";
    const char *expected = "A:0 C:0 G:1 T:0";

    test_strand_count(dna_strand, expected);
}

static void test_repeated_nucleotide(void) {
    const char *dna_strand = "GGGGGGG";
    const char *expected = "A:0 C:0 G:7 T:0";

    test_strand_count(dna_strand, expected);
}

static void test_multiple_nucleotides(void) {
    const char *dna_strand =
        "AGCTTTTCATTCTGACTGCAACGGGCAATATGTCTCTGTGTGGATTAAAAAAAGAGTGTCTGATAGCAG"
        "C";
    const char *expected = "A:20 C:12 G:17 T:21";

    test_strand_count(dna_strand, expected);
}

static void test_invalid_nucleotide(void) {
    const char *dna_strand = "AGXXACT";
    const char *expected = "";

    test_strand_count(dna_strand, expected);
}

int main(void) {
    UNITY_BEGIN();

    RUN_TEST(test_empty_strand);
    RUN_TEST(test_can_count_one_nucleotide_in_single_character_input);
    RUN_TEST(test_repeated_nucleotide);
    RUN_TEST(test_multiple_nucleotides);
    RUN_TEST(test_invalid_nucleotide);

    return UNITY_END();
}
