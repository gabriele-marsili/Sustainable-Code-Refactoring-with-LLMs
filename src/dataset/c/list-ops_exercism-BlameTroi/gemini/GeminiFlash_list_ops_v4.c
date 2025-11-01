#include "list_ops.h"
#include <stdlib.h>
#include <string.h>

static list_t *
empty_list(size_t length) {
  list_t *l = malloc(sizeof(list_t));
  if (l == NULL) {
    return NULL;
  }
  l->elements = calloc(length, sizeof(list_element_t));
  if (l->elements == NULL) {
    free(l);
    return NULL;
  }
  l->length = length;
  return l;
}

list_t *
new_list(size_t length, list_element_t elements[]) {
  list_t *l = empty_list(length);
  if (l == NULL) {
    return NULL;
  }
  memcpy(l->elements, elements, length * sizeof(list_element_t));
  return l;
}

list_t *
append_list(list_t *list1, list_t *list2) {
  size_t new_length = list1->length + list2->length;
  list_t *l = empty_list(new_length);
  if (l == NULL) {
    return NULL;
  }
  memcpy(l->elements, list1->elements, list1->length * sizeof(list_element_t));
  memcpy(l->elements + list1->length, list2->elements, list2->length * sizeof(list_element_t));
  return l;
}

list_t *
filter_list(list_t *list, bool (*filter)(list_element_t)) {
  size_t filtered_count = 0;
  list_element_t *filtered_elements = malloc(list->length * sizeof(list_element_t));
  if (filtered_elements == NULL) {
    return empty_list(0);
  }

  for (size_t i = 0; i < list->length; i++) {
    if (filter(list->elements[i])) {
      filtered_elements[filtered_count++] = list->elements[i];
    }
  }

  list_t *filtered = empty_list(filtered_count);
  if (filtered == NULL) {
    free(filtered_elements);
    return NULL;
  }

  memcpy(filtered->elements, filtered_elements, filtered_count * sizeof(list_element_t));
  free(filtered_elements);
  return filtered;
}

size_t
length_list(list_t *list) {
  return list->length;
}

list_t *
map_list(list_t *list, list_element_t (*map)(list_element_t)) {
  list_t *mapped = empty_list(list->length);
  if (mapped == NULL) {
    return NULL;
  }
  for (size_t i = 0; i < list->length; i++) {
    mapped->elements[i] = map(list->elements[i]);
  }
  return mapped;
}

list_element_t
foldl_list(list_t *list, list_element_t initial,
           list_element_t (*foldl)(list_element_t,
                                   list_element_t)) {
  list_element_t folded = initial;
  for (size_t i = 0; i < list->length; i++) {
    folded = foldl(list->elements[i], folded);
  }
  return folded;
}

list_element_t
foldr_list(list_t *list, list_element_t initial,
                          list_element_t (*foldr)(list_element_t,
                                                  list_element_t)) {
  list_element_t folded = initial;
  for (size_t i = list->length; i > 0; i--) {
    folded = foldr(list->elements[i-1], folded);
  }
  return folded;
}

list_t *reverse_list(list_t *list) {
  list_t *reversed = empty_list(list->length);
  if (reversed == NULL) {
    return NULL;
  }
  for (size_t i = 0; i < list->length; i++) {
    reversed->elements[i] = list->elements[list->length - 1 - i];
  }
  return reversed;
}

void delete_list(list_t *list) {
  if (list != NULL) {
    free(list->elements);
    free(list);
  }
}