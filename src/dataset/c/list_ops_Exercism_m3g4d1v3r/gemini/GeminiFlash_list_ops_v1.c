#include "list_ops.h"
#include <string.h>

list_t *allocate_new_list(size_t length);

list_t *allocate_new_list(size_t length) {
    list_t *result;

    result = malloc(sizeof(list_t));
    if (result == NULL) return (NULL);
    result->length = length;
    result->elements = calloc(length, sizeof(list_element_t));
    if (result->elements == NULL) {
        free(result);
        return (NULL);
    }
    return (result);
}

list_t *new_list(size_t length, list_element_t elements[]) {
    list_t *result;

    result = allocate_new_list(length);
    if (result == NULL) return (NULL);
    if (elements != NULL) {
        memcpy(result->elements, elements, length * sizeof(list_element_t));
    }
    return (result);
}

void delete_list(list_t *list) {
    if (list != NULL) {
        free(list->elements);
        free(list);
    }
}

list_t *append_list(list_t *list1, list_t *list2) {
    size_t list1_len = (list1 != NULL) ? list1->length : 0;
    size_t list2_len = (list2 != NULL) ? list2->length : 0;
    size_t result_len = list1_len + list2_len;

    list_t *result = allocate_new_list(result_len);
    if (result == NULL) return (NULL);

    if (list1 != NULL) {
        memcpy(result->elements, list1->elements, list1_len * sizeof(list_element_t));
    }
    if (list2 != NULL) {
        memcpy(result->elements + list1_len, list2->elements, list2_len * sizeof(list_element_t));
    }

    return (result);
}

list_t *filter_list(list_t *list, bool (*filter)(list_element_t)) {
    if (list == NULL || filter == NULL) return (NULL);

    size_t result_length = 0;
    for (size_t idx = 0; idx < list->length; idx++) {
        if (filter(list->elements[idx])) {
            result_length++;
        }
    }

    list_t *result = allocate_new_list(result_length);
    if (result == NULL) return (NULL);

    size_t result_idx = 0;
    for (size_t idx = 0; idx < list->length; idx++) {
        if (filter(list->elements[idx])) {
            result->elements[result_idx++] = list->elements[idx];
        }
    }

    return (result);
}

size_t length_list(list_t *list) {
    return (list == NULL) ? 0 : list->length;
}

list_t *map_list(list_t *list, list_element_t (*map)(list_element_t)) {
    if (list == NULL || map == NULL) return (NULL);

    list_t *result = allocate_new_list(list->length);
    if (result == NULL) return (NULL);

    for (size_t idx = 0; idx < list->length; idx++) {
        result->elements[idx] = map(list->elements[idx]);
    }
    return (result);
}

list_element_t foldl_list(list_t *list, list_element_t initial,
                          list_element_t (*foldl)(list_element_t,
                                                  list_element_t)) {
    if (list == NULL || foldl == NULL) return (initial);

    for (size_t idx = 0; idx < list->length; idx++) {
        initial = foldl(initial, list->elements[idx]);
    }
    return (initial);
}

list_element_t foldr_list(list_t *list, list_element_t initial,
                          list_element_t (*foldr)(list_element_t,
                                                  list_element_t)) {
    if (list == NULL || foldr == NULL) return (initial);

    for (size_t idx = list->length; idx > 0; idx--) {
        initial = foldr(list->elements[idx - 1], initial);
    }
    return (initial);
}

list_t *reverse_list(list_t *list) {
    if (list == NULL) return (NULL);

    list_t *result = allocate_new_list(list->length);
    if (result == NULL) return (NULL);

    for (size_t idx = 0; idx < list->length; idx++) {
        result->elements[idx] = list->elements[list->length - 1 - idx];
    }
    return (result);
}