#include <stdlib.h>
#include <string.h>

#include "atbash_cipher.h"
#include "unity.h"

void setUp(void) {}

void tearDown(void) {}

static void test_encode(char *input, char *expected) {
    char *result = atbash_encode(input);

    TEST_ASSERT_EQUAL_STRING(expected, result);

    free(result);
}

static void test_decode(char *input, char *expected) {
    char *result = atbash_decode(input);

    TEST_ASSERT_EQUAL_STRING(expected, result);

    free(result);
}

static void test_encode_yes(void) { test_encode("yes", "bvh"); }

static void test_encode_no(void) { test_encode("no", "ml"); }

static void test_encode_OMG(void) { test_encode("OMG", "lnt"); }

static void test_encode_spaces(void) { test_encode("O M G", "lnt"); }

static void test_encode_mindblowingly(void) {
    test_encode("mindblowingly", "nrmwy oldrm tob");
}

static void test_encode_numbers(void) {
    test_encode("Testing,1 2 3, testing.", "gvhgr mt123 gvhgr mt");
}

static void test_encode_deep_thought(void) {
    test_encode("Truth is fiction.", "gifgs rhurx grlm");
}
// Thequ ickbr ownfo xjump sover thela zydog.
static void test_encode_all_the_letters(void) {
    test_encode("The quick brown fox jumps over the lazy dog.",
                "gsvjf rxpyi ldmul cqfnk hlevi gsvoz abwlt");
}

static void test_decode_exercism(void) { test_decode("vcvix rhn", "exercism"); }

static void test_decode_a_sentence(void) {
    test_decode("zmlyh gzxov rhlug vmzhg vkkrm thglm v",
                "anobstacleisoftenasteppingstone");
}

static void test_decode_numbers(void) {
    test_decode("gvhgr mt123 gvhgr mt", "testing123testing");
}

static void test_decode_all_the_letters(void) {
    test_decode("gsvjf rxpyi ldmul cqfnk hlevi gsvoz abwlt",
                "thequickbrownfoxjumpsoverthelazydog");
}

static void test_decode_with_too_many_spaces(void) {
    test_decode("vc vix    rhn", "exercism");
}

static void test_decode_with_no_spaces(void) {
    test_decode("zmlyhgzxovrhlugvmzhgvkkrmthglmv",
                "anobstacleisoftenasteppingstone");
}

int main(void) {
    UNITY_BEGIN();

    RUN_TEST(test_encode_yes);
    RUN_TEST(test_encode_no);
    RUN_TEST(test_encode_OMG);
    RUN_TEST(test_encode_spaces);
    RUN_TEST(test_encode_mindblowingly);
    RUN_TEST(test_encode_numbers);
    RUN_TEST(test_encode_deep_thought);
    RUN_TEST(test_encode_all_the_letters);

    RUN_TEST(test_decode_exercism);
    RUN_TEST(test_decode_a_sentence);
    RUN_TEST(test_decode_numbers);
    RUN_TEST(test_decode_all_the_letters);
    RUN_TEST(test_decode_with_too_many_spaces);
    RUN_TEST(test_decode_with_no_spaces);

    return UNITY_END();
}
