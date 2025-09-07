#include "list_ops.h"
#include <string.h>

list_t *allocate_new_list(size_t length);

list_t *allocate_new_list(size_t length) {
    list_t *result = malloc(sizeof(list_t));
    if (!result) return NULL;

    result->length = length;
    result->elements = malloc(sizeof(list_element_t) * length);
    if (!result->elements) {
        free(result);
        return NULL;
    }
    return result;
}

list_t *new_list(size_t length, list_element_t elements[]) {
    list_t *result = allocate_new_list(length);
    if (!result) return NULL;

    memcpy(result->elements, elements, sizeof(list_element_t) * length);
    return result;
}

void delete_list(list_t *list) {
    if (list) {
        free(list->elements);
        free(list);
    }
}

list_t *append_list(list_t *list1, list_t *list2) {
    size_t len1 = list1 ? list1->length : 0;
    size_t len2 = list2 ? list2->length : 0;
    list_t *result = allocate_new_list(len1 + len2);

    if (!result) return NULL;

    if (list1) {
        memcpy(result->elements, list1->elements, sizeof(list_element_t) * len1);
    }
    if (list2) {
        memcpy(result->elements + len1, list2->elements, sizeof(list_element_t) * len2);
    }
    return result;
}

list_t *filter_list(list_t *list, bool (*filter)(list_element_t)) {
    if (!list || !filter) return NULL;

    size_t result_length = 0;
    for (size_t idx = 0; idx < list->length; idx++) {
        if (filter(list->elements[idx])) {
            result_length++;
        }
    }

    list_t *result = allocate_new_list(result_length);
    if (!result) return NULL;

    size_t result_idx = 0;
    for (size_t idx = 0; idx < list->length; idx++) {
        if (filter(list->elements[idx])) {
            result->elements[result_idx++] = list->elements[idx];
        }
    }
    return result;
}

size_t length_list(list_t *list) {
    return list ? list->length : 0;
}

list_t *map_list(list_t *list, list_element_t (*map)(list_element_t)) {
    if (!list || !map) return NULL;

    list_t *result = allocate_new_list(list->length);
    if (!result) return NULL;

    for (size_t idx = 0; idx < list->length; idx++) {
        result->elements[idx] = map(list->elements[idx]);
    }
    return result;
}

list_element_t foldl_list(list_t *list, list_element_t initial,
                          list_element_t (*foldl)(list_element_t,
                                                  list_element_t)) {
    if (!list || !foldl) return initial;

    for (size_t idx = 0; idx < list->length; idx++) {
        initial = foldl(initial, list->elements[idx]);
    }
    return initial;
}

list_element_t foldr_list(list_t *list, list_element_t initial,
                          list_element_t (*foldr)(list_element_t,
                                                  list_element_t)) {
    if (!list || !foldr) return initial;

    for (size_t idx = list->length; idx > 0; idx--) {
        initial = foldr(list->elements[idx - 1], initial);
    }
    return initial;
}

list_t *reverse_list(list_t *list) {
    if (!list) return NULL;

    list_t *result = allocate_new_list(list->length);
    if (!result) return NULL;

    for (size_t idx = 0; idx < list->length; idx++) {
        result->elements[idx] = list->elements[list->length - 1 - idx];
    }
    return result;
}