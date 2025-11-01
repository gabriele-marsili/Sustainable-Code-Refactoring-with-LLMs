#include "sublist.h"
#include <stdbool.h>
#include <string.h>

comparison_result_t check_lists(int *list_to_compare, int *base_list,
                                size_t list_to_compare_element_count,
                                size_t base_list_element_count) {
  // Handle empty lists first
  if (list_to_compare_element_count == 0) {
    return (base_list_element_count == 0) ? EQUAL : SUBLIST;
  }
  
  if (base_list_element_count == 0) {
    return SUPERLIST;
  }

  // Determine which list is smaller
  bool is_sublist_check = list_to_compare_element_count <= base_list_element_count;
  
  const int *smaller_list = is_sublist_check ? list_to_compare : base_list;
  const int *larger_list = is_sublist_check ? base_list : list_to_compare;
  
  size_t smaller_count = is_sublist_check ? list_to_compare_element_count : base_list_element_count;
  size_t larger_count = is_sublist_check ? base_list_element_count : list_to_compare_element_count;

  // Early return for equal sizes
  if (smaller_count == larger_count) {
    return (memcmp(smaller_list, larger_list, smaller_count * sizeof(int)) == 0) ? EQUAL : UNEQUAL;
  }

  // Search for sublist pattern
  size_t search_limit = larger_count - smaller_count + 1;
  size_t compare_bytes = smaller_count * sizeof(int);
  
  for (size_t i = 0; i < search_limit; i++) {
    if (memcmp(smaller_list, &larger_list[i], compare_bytes) == 0) {
      return is_sublist_check ? SUBLIST : SUPERLIST;
    }
  }

  return UNEQUAL;
}

comparison_result_t check_lists_v1(int *list_to_compare, int *base_list,
                                   size_t list_to_compare_element_count,
                                   size_t base_list_element_count) {
  if (base_list_element_count == 0 && list_to_compare_element_count == 0) {
    return EQUAL;
  }

  if (base_list_element_count > 0 && list_to_compare_element_count == 0) {
    return SUBLIST;
  }

  if (base_list_element_count == 0 && list_to_compare_element_count > 0) {
    return SUPERLIST;
  }

  size_t li = 0;
  size_t bi = 0;
  size_t section_count = 0;
  int index_section = -1;

  while (bi < base_list_element_count) {
    for (; li < list_to_compare_element_count; li++) {
      if (base_list[bi] == list_to_compare[li]) {
        if (section_count == 0) {
          index_section = bi;
        }

        section_count++;
        break;
      }

      section_count = 0;
    }

    if (section_count == list_to_compare_element_count ||
        section_count == base_list_element_count) {
      break;
    }

    if (section_count == 0) {
      if (index_section != -1) {
        bi = index_section + 1;
        index_section = -1;
      } else {
        bi++;
      }

      li = 0;
      continue;
    }

    li++;
    bi++;
  }

  if (section_count != list_to_compare_element_count &&
      section_count != base_list_element_count) {
    return UNEQUAL;
  }

  if (section_count == list_to_compare_element_count &&
      base_list_element_count > list_to_compare_element_count) {
    return SUBLIST;
  }

  if (section_count == base_list_element_count &&
      list_to_compare_element_count > base_list_element_count) {
    return SUPERLIST;
  }

  return EQUAL;
}

comparison_result_t check_lists_v2(int *list_to_compare, int *base_list,
                                   size_t list_to_compare_element_count,
                                   size_t base_list_element_count) {
  bool sublist = list_to_compare_element_count <= base_list_element_count;

  const int *smaller_list = sublist ? list_to_compare : base_list;
  const int *greater_list = sublist ? base_list : list_to_compare;

  size_t min_count = sublist ? list_to_compare_element_count : base_list_element_count;
  size_t max_count = sublist ? base_list_element_count : list_to_compare_element_count;

  for (size_t i = 0; i <= max_count - min_count; i++) {
    const size_t compare_size = min_count * sizeof(int);

    if (memcmp(smaller_list, &greater_list[i], compare_size) == 0) {
      if (min_count == max_count) {
        return EQUAL;
      }

      if (sublist) {
        return SUBLIST;
      }

      return SUPERLIST;
    }
  }

  return UNEQUAL;
}