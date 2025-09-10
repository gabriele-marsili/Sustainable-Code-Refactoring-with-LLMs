#include "sublist.h"
#include <stdbool.h>

comparison_result_t check_lists(int *list_to_compare, int *base_list,
                                size_t list_size, size_t base_size) {
    if (list_size == 0) {
        return base_size == 0 ? EQUAL : SUBLIST;
    }

    if (base_size < list_size) {
        // Swap lists and sizes to ensure base_list is the larger list
        int *temp_list = list_to_compare;
        list_to_compare = base_list;
        base_list = temp_list;

        size_t temp_size = list_size;
        list_size = base_size;
        base_size = temp_size;

        return SUPERLIST;
    } else if (base_size == list_size) {
        // Lists are the same size, check for equality
        for (size_t i = 0; i < list_size; ++i) {
            if (base_list[i] != list_to_compare[i]) {
                return UNEQUAL;
            }
        }
        return EQUAL;
    }

    // base_size > list_size, check if list_to_compare is a sublist of base_list
    for (size_t i = 0; i <= base_size - list_size; ++i) {
        bool match = true;
        for (size_t j = 0; j < list_size; ++j) {
            if (base_list[i + j] != list_to_compare[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            return SUBLIST;
        }
    }

    return UNEQUAL;
}