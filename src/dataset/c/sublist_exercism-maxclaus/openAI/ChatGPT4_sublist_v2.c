#include "sublist.h"
#include <stdbool.h>
#include <string.h>

comparison_result_t check_lists(int *list_to_compare, int *base_list,
                                size_t list_to_compare_element_count,
                                size_t base_list_element_count) {
  return check_lists_v2(list_to_compare, base_list,
                        list_to_compare_element_count, base_list_element_count);
}

comparison_result_t check_lists_v1(int *list_to_compare, int *base_list,
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

  if (list_to_compare_element_count > base_list_element_count) {
    int *temp = list_to_compare;
    list_to_compare = base_list;
    base_list = temp;

    size_t temp_count = list_to_compare_element_count;
    list_to_compare_element_count = base_list_element_count;
    base_list_element_count = temp_count;
  }

  for (size_t i = 0; i <= base_list_element_count - list_to_compare_element_count; i++) {
    if (memcmp(&base_list[i], list_to_compare, list_to_compare_element_count * sizeof(int)) == 0) {
      return (list_to_compare_element_count == base_list_element_count) ? EQUAL : SUBLIST;
    }
  }

  return UNEQUAL;
}

comparison_result_t check_lists_v2(int *list_to_compare, int *base_list,
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

  if (list_to_compare_element_count > base_list_element_count) {
    int *temp = list_to_compare;
    list_to_compare = base_list;
    base_list = temp;

    size_t temp_count = list_to_compare_element_count;
    list_to_compare_element_count = base_list_element_count;
    base_list_element_count = temp_count;
  }

  for (size_t i = 0; i <= base_list_element_count - list_to_compare_element_count; i++) {
    if (memcmp(&base_list[i], list_to_compare, list_to_compare_element_count * sizeof(int)) == 0) {
      return (list_to_compare_element_count == base_list_element_count) ? EQUAL : SUBLIST;
    }
  }

  return UNEQUAL;
}