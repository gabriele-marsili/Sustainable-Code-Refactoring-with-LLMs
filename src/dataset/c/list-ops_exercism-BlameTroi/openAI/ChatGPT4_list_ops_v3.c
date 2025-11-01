#include "list_ops.h"

// Allocate space for a list of LENGTH elements.
static list_t *empty_list(size_t length) {
  list_t *l = malloc(sizeof(size_t) + (length * sizeof(list_element_t)));
  if (l) {
    l->length = 0;
  }
  return l;
}

// Create and populate a new list with the provided ELEMENTS.
list_t *new_list(size_t length, list_element_t elements[]) {
  list_t *l = empty_list(length);
  if (l && elements) {
    memcpy(l->elements, elements, length * sizeof(list_element_t));
    l->length = length;
  }
  return l;
}

// Return a new list containing the elements of LIST1 followed by the elements of LIST2.
list_t *append_list(list_t *list1, list_t *list2) {
  size_t total_length = list1->length + list2->length;
  list_t *l = empty_list(total_length);
  if (l) {
    memcpy(l->elements, list1->elements, list1->length * sizeof(list_element_t));
    memcpy(l->elements + list1->length, list2->elements, list2->length * sizeof(list_element_t));
    l->length = total_length;
  }
  return l;
}

// Filter list returning only values that satisfy the filter function.
list_t *filter_list(list_t *list, bool (*filter)(list_element_t)) {
  size_t filteredCount = 0;
  for (size_t i = 0; i < list->length; i++) {
    if (filter(list->elements[i])) {
      filteredCount++;
    }
  }
  list_t *filtered = empty_list(filteredCount);
  if (filtered) {
    size_t index = 0;
    for (size_t i = 0; i < list->length; i++) {
      if (filter(list->elements[i])) {
        filtered->elements[index++] = list->elements[i];
      }
    }
    filtered->length = filteredCount;
  }
  return filtered;
}

// Returns the length of the list.
size_t length_list(list_t *list) {
  return list->length;
}

// Return a list of elements whose values equal those of LIST after the MAP.
list_t *map_list(list_t *list, list_element_t (*map)(list_element_t)) {
  list_t *mapped = empty_list(list->length);
  if (mapped) {
    for (size_t i = 0; i < list->length; i++) {
      mapped->elements[i] = map(list->elements[i]);
    }
    mapped->length = list->length;
  }
  return mapped;
}

// Folds (reduces) the LIST from the left with a function.
list_element_t foldl_list(list_t *list, list_element_t initial, list_element_t (*foldl)(list_element_t, list_element_t)) {
  list_element_t folded = initial;
  for (size_t i = 0; i < list->length; i++) {
    folded = foldl(list->elements[i], folded);
  }
  return folded;
}

// Folds (reduces) the LIST from the right with a function.
list_element_t foldr_list(list_t *list, list_element_t initial, list_element_t (*foldr)(list_element_t, list_element_t)) {
  list_element_t folded = initial;
  for (size_t i = list->length; i > 0; i--) {
    folded = foldr(list->elements[i - 1], folded);
  }
  return folded;
}

// Reverse the order of the elements of the LIST.
list_t *reverse_list(list_t *list) {
  list_t *reversed = empty_list(list->length);
  if (reversed) {
    for (size_t i = 0; i < list->length; i++) {
      reversed->elements[i] = list->elements[list->length - 1 - i];
    }
    reversed->length = list->length;
  }
  return reversed;
}

// Destroy the entire list. List will be a dangling pointer after calling this method on it.
void delete_list(list_t *list) {
  free(list);
}