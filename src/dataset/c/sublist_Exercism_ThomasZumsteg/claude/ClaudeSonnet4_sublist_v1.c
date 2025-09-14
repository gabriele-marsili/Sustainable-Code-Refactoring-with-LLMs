#include "sublist.h"

comparison_result_t check_lists(int *list_to_compare, int *base_list,
        size_t list_size, size_t base_size) {

    if(list_size == 0)
        return base_size == 0 ? EQUAL : SUBLIST;

    if(base_size == 0)
        return UNEQUAL;

    comparison_result_t result = SUBLIST;
    int *smaller_list = list_to_compare;
    int *larger_list = base_list;
    size_t smaller_size = list_size;
    size_t larger_size = base_size;

    if(base_size < list_size) {
        smaller_list = base_list;
        larger_list = list_to_compare;
        smaller_size = base_size;
        larger_size = list_size;
        result = SUPERLIST;
    } else if(base_size == list_size) {
        result = EQUAL;
    }

    for(size_t i = 0; i <= larger_size - smaller_size; i++) {
        if(larger_list[i] == smaller_list[0]) {
            size_t j;
            for(j = 1; j < smaller_size; j++) {
                if(larger_list[i + j] != smaller_list[j]) {
                    break;
                }
            }
            if(j == smaller_size) {
                return result;
            }
        }
    }
    return UNEQUAL;
}