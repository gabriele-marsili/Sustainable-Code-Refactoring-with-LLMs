#include "sublist.h"

comparison_result_t check_lists(int *list_to_compare, int *base_list,
        size_t list_size, size_t base_size) {

    if (list_size == 0)
        return base_size == 0 ? EQUAL : SUBLIST;

    if (base_size < list_size) {
        int *temp = base_list;
        base_list = list_to_compare;
        list_to_compare = temp;
        size_t temp_size = base_size;
        base_size = list_size;
        list_size = temp_size;
        return check_lists(list_to_compare, base_list, list_size, base_size) == SUBLIST ? SUPERLIST : UNEQUAL;
    }

    if (base_size == list_size) {
        for (size_t i = 0; i < list_size; i++) {
            if (base_list[i] != list_to_compare[i])
                return UNEQUAL;
        }
        return EQUAL;
    }

    for (size_t b = 0; b <= base_size - list_size; b++) {
        size_t l = 0;
        while (l < list_size && base_list[b + l] == list_to_compare[l]) {
            l++;
        }
        if (l == list_size) {
            return SUBLIST;
        }
    }

    return UNEQUAL;
}