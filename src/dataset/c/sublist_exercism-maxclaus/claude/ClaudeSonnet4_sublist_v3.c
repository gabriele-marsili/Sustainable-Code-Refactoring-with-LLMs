#include "sublist.h"
#include <stdbool.h>
#include <string.h>

comparison_result_t check_lists(int *list_to_compare, int *base_list,
                                size_t list_to_compare_element_count,
                                size_t base_list_element_count) {
  if (list_to_compare_element_count == 0 && base_list_element_count == 0) {
    return EQUAL;
  }
  
  if (list_to_compare_element_count == 0) {
    return SUBLIST;
  }
  
  if (base_list_element_count == 0) {
    return SUPERLIST;
  }

  const int *smaller_list, *larger_list;
  size_t smaller_count, larger_count;
  bool is_sublist_check;

  if (list_to_compare_element_count <= base_list_element_count) {
    smaller_list = list_to_compare;
    larger_list = base_list;
    smaller_count = list_to_compare_element_count;
    larger_count = base_list_element_count;
    is_sublist_check = true;
  } else {
    smaller_list = base_list;
    larger_list = list_to_compare;
    smaller_count = base_list_element_count;
    larger_count = list_to_compare_element_count;
    is_sublist_check = false;
  }

  const size_t compare_bytes = smaller_count * sizeof(int);
  const size_t max_offset = larger_count - smaller_count;

  for (size_t i = 0; i <= max_offset; i++) {
    if (memcmp(smaller_list, &larger_list[i], compare_bytes) == 0) {
      if (smaller_count == larger_count) {
        return EQUAL;
      }
      return is_sublist_check ? SUBLIST : SUPERLIST;
    }
  }

  return UNEQUAL;
}

comparison_result_t check_lists_v1(int *list_to_compare, int *base_list,
                                   size_t list_to_compare_element_count,
                                   size_t base_list_element_count) {
  return check_lists(list_to_compare, base_list, list_to_compare_element_count, base_list_element_count);
}

comparison_result_t check_lists_v2(int *list_to_compare, int *base_list,
                                   size_t list_to_compare_element_count,
                                   size_t base_list_element_count) {
  return check_lists(list_to_compare, base_list, list_to_compare_element_count, base_list_element_count);
}