#include "sublist.h"

comparison_result_t check_lists(int *list_to_compare, int *base_list,
        size_t list_size, size_t base_size) {

    if(list_size == 0)
        return base_size == 0 ? EQUAL : SUBLIST;

    if(base_size == 0)
        return UNEQUAL;

    comparison_result_t result;
    int *shorter_list, *longer_list;
    size_t shorter_size, longer_size;

    if(base_size < list_size) {
        shorter_list = base_list;
        longer_list = list_to_compare;
        shorter_size = base_size;
        longer_size = list_size;
        result = SUPERLIST;
    } else if(base_size == list_size) {
        shorter_list = list_to_compare;
        longer_list = base_list;
        shorter_size = list_size;
        longer_size = base_size;
        result = EQUAL;
    } else {
        shorter_list = list_to_compare;
        longer_list = base_list;
        shorter_size = list_size;
        longer_size = base_size;
        result = SUBLIST;
    }

    for(size_t i = 0; i <= longer_size - shorter_size; i++) {
        size_t j = 0;
        while(j < shorter_size && longer_list[i + j] == shorter_list[j]) {
            j++;
        }
        if(j == shorter_size) {
            return result;
        }
    }
    return UNEQUAL;
}