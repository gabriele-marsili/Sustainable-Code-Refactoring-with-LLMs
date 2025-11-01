#include "sublist.h"
#include <stdbool.h>
#include <string.h>

comparison_result_t check_lists(int *list_to_compare, int *base_list,
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

  if (list_to_compare_element_count < base_list_element_count) {
    for (size_t i = 0; i <= base_list_element_count - list_to_compare_element_count;
         i++) {
      if (memcmp(list_to_compare, &base_list[i],
                 list_to_compare_element_count * sizeof(int)) == 0) {
        return SUBLIST;
      }
    }
  } else {
    for (size_t i = 0; i <= list_to_compare_element_count - base_list_element_count;
         i++) {
      if (memcmp(base_list, &list_to_compare[i],
                 base_list_element_count * sizeof(int)) == 0) {
        return SUPERLIST;
      }
    }
  }

  return UNEQUAL;
}