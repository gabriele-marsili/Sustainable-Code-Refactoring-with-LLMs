#include "sublist.h"
#include <stdbool.h>

comparison_result_t check_lists(int *list_a, int *list_b, size_t len_a,
                                size_t len_b) {
    if (len_a == 0 && len_b == 0) return EQUAL;
    if (len_a == 0) return SUBLIST;
    if (len_b == 0) return SUPERLIST;

    if (len_a == len_b) {
        for (size_t idx = 0; idx < len_a; idx++) {
            if (list_a[idx] != list_b[idx]) return UNEQUAL;
        }
        return EQUAL;
    }

    comparison_result_t target_result;
    int *sml_list, *big_list;
    size_t sml_len, big_len;

    if (len_a < len_b) {
        target_result = SUBLIST;
        sml_list = list_a;
        sml_len = len_a;
        big_list = list_b;
        big_len = len_b;
    } else {
        target_result = SUPERLIST;
        sml_list = list_b;
        sml_len = len_b;
        big_list = list_a;
        big_len = len_a;
    }

    if (sml_len > big_len) return UNEQUAL;

    for (size_t i = 0; i <= big_len - sml_len; ++i) {
        bool found = true;
        for (size_t j = 0; j < sml_len; ++j) {
            if (big_list[i + j] != sml_list[j]) {
                found = false;
                break;
            }
        }
        if (found) {
            return target_result;
        }
    }

    return UNEQUAL;
}