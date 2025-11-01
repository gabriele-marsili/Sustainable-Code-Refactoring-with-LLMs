#include "list_ops.h"
#include <string.h>

static
list_t *
empty_list(size_t length) {
  return calloc(1, sizeof(size_t) + (length * sizeof(list_element_t)));
}

list_t *
new_list(size_t length, list_element_t elements[]) {
  list_t *l = empty_list(length);
  if (length > 0) {
    memcpy(l->elements, elements, length * sizeof(list_element_t));
  }
  l->length = length;
  return l;
}

list_t *
append_list(list_t *list1, list_t *list2) {
  const size_t total_length = list1->length + list2->length;
  list_t *l = empty_list(total_length);
  l->length = total_length;
  
  if (list1->length > 0) {
    memcpy(l->elements, list1->elements, list1->length * sizeof(list_element_t));
  }
  if (list2->length > 0) {
    memcpy(l->elements + list1->length, list2->elements, list2->length * sizeof(list_element_t));
  }
  return l;
}

list_t *
filter_list(list_t *list, bool (*filter)(list_element_t)) {
  if (list->length == 0) {
    return empty_list(0);
  }
  
  list_t *filtered = empty_list(list->length);
  size_t filteredCount = 0;
  
  for (size_t i = 0; i < list->length; i++) {
    if (filter(list->elements[i])) {
      filtered->elements[filteredCount++] = list->elements[i];
    }
  }
  filtered->length = filteredCount;
  return filtered;
}

size_t
length_list(list_t *list) {
  return list->length;
}

list_t *
map_list(list_t *list, list_element_t (*map)(list_element_t)) {
  list_t *mapped = empty_list(list->length);
  mapped->length = list->length;
  
  for (size_t i = 0; i < list->length; i++) {
    mapped->elements[i] = map(list->elements[i]);
  }
  return mapped;
}

list_element_t
foldl_list(list_t *list, list_element_t initial,
           list_element_t (*foldl)(list_element_t, list_element_t)) {
  list_element_t folded = initial;
  for (size_t i = 0; i < list->length; i++) {
    folded = foldl(list->elements[i], folded);
  }
  return folded;
}

list_element_t
foldr_list(list_t *list, list_element_t initial,
           list_element_t (*foldr)(list_element_t, list_element_t)) {
  list_element_t folded = initial;
  for (size_t i = list->length; i > 0; i--) {
    folded = foldr(list->elements[i-1], folded);
  }
  return folded;
}

list_t *reverse_list(list_t *list) {
  list_t *reversed = empty_list(list->length);
  reversed->length = list->length;
  
  for (size_t i = 0; i < list->length; i++) {
    reversed->elements[i] = list->elements[list->length - 1 - i];
  }
  return reversed;
}

void delete_list(list_t *list) {
  free(list);
}