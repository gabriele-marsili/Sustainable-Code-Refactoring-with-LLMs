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
  if (list_to_compare_element_count <= base_list_element_count) {
    // Check if list_to_compare is sublist of base_list
    size_t search_limit = base_list_element_count - list_to_compare_element_count + 1;
    size_t compare_bytes = list_to_compare_element_count * sizeof(int);
    
    for (size_t i = 0; i < search_limit; i++) {
      if (memcmp(list_to_compare, &base_list[i], compare_bytes) == 0) {
        return (list_to_compare_element_count == base_list_element_count) ? EQUAL : SUBLIST;
      }
    }
  } else {
    // Check if base_list is sublist of list_to_compare
    size_t search_limit = list_to_compare_element_count - base_list_element_count + 1;
    size_t compare_bytes = base_list_element_count * sizeof(int);
    
    for (size_t i = 0; i < search_limit; i++) {
      if (memcmp(base_list, &list_to_compare[i], compare_bytes) == 0) {
        return SUPERLIST;
      }
    }
  }

  return UNEQUAL;
}