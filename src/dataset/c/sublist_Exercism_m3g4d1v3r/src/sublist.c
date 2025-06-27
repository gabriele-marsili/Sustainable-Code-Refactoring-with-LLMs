#include "sublist.h"

comparison_result_t check_lists(int *list_a, int *list_b, size_t len_a,
                                size_t len_b) {
    comparison_result_t target_result;
    int *big_list, *sml_list;
    size_t big_len, sml_len;

    if (len_a == 0 && len_b == 0) return (EQUAL);
    if (len_a == 0) return (SUBLIST);
    if (len_b == 0) return (SUPERLIST);
    if (len_a == len_b) {
        for (size_t idx = 0; idx < len_a; idx++) {
            if (list_a[idx] != list_b[idx]) return (UNEQUAL);
        }
        return (EQUAL);
    }

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
    for (size_t idx = 0; idx < big_len; idx++) {
        size_t aux_idx = 0;
        while (aux_idx < sml_len && (idx + aux_idx) < big_len &&
               big_list[idx + aux_idx] == sml_list[aux_idx]) {
            aux_idx++;
        }
        if (aux_idx == sml_len) {
            return (target_result);
        }
    }
    return (UNEQUAL);
}
