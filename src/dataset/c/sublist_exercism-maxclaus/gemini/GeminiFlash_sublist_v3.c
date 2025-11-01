#include "sublist.h"
#include <stdbool.h>
#include <string.h>

comparison_result_t check_lists(int *list_to_compare, int *base_list,
                                size_t list_to_compare_element_count,
                                size_t base_list_element_count) {
  return check_lists_v3(list_to_compare, base_list,
                        list_to_compare_element_count, base_list_element_count);
}

comparison_result_t check_lists_v3(int *list_to_compare, int *base_list,
                                   size_t list_to_compare_element_count,
                                   size_t base_list_element_count) {
  if (list_to_compare_element_count == base_list_element_count) {
    if (list_to_compare_element_count == 0) {
      return EQUAL;
    }
    if (memcmp(list_to_compare, base_list,
               list_to_compare_element_count * sizeof(int)) == 0) {
      return EQUAL;
    } else {
      return UNEQUAL;
    }
  }

  if (list_to_compare_element_count == 0) {
    return SUBLIST;
  }

  if (base_list_element_count == 0) {
    return SUPERLIST;
  }

  bool sublist = list_to_compare_element_count < base_list_element_count;

  int *smaller_list = sublist ? list_to_compare : base_list;
  int *greater_list = sublist ? base_list : list_to_compare;

  size_t smaller_count = sublist ? list_to_compare_element_count
                                 : base_list_element_count;
  size_t greater_count = sublist ? base_list_element_count
                                 : list_to_compare_element_count;

  for (size_t i = 0; i <= greater_count - smaller_count; i++) {
    if (memcmp(smaller_list, &greater_list[i], smaller_count * sizeof(int)) ==
        0) {
      return sublist ? SUBLIST : SUPERLIST;
    }
  }

  return UNEQUAL;
}