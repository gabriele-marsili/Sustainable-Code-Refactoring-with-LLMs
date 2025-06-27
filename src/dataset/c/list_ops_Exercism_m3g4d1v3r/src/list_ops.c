#include "list_ops.h"

list_t *allocate_new_list(size_t length);

list_t *allocate_new_list(size_t length) {
    list_t *result;

    result = malloc(sizeof(list_t));
    if (result == NULL) return (NULL);
    result->length = length;
    result->elements = malloc(sizeof(list_element_t) * length);
    if (result->elements == NULL) return (NULL);
    return (result);
}

list_t *new_list(size_t length, list_element_t elements[]) {
    list_t *result;

    result = allocate_new_list(length);
    if (result == NULL) return (NULL);
    for (size_t idx = 0; idx < length; idx++) {
        result->elements[idx] = elements[idx];
    }
    return (result);
}

void delete_list(list_t *list) {
    if (list == NULL) return;
    if (list->elements != NULL) free(list->elements);
    free(list);
}

list_t *append_list(list_t *list1, list_t *list2) {
    list_t *result;
    size_t result_len;
    size_t idxR;

    result_len = 0;
    if (list1 != NULL) result_len += list1->length;
    if (list2 != NULL) result_len += list2->length;
    result = allocate_new_list(list1->length + list2->length);
    if (result == NULL) return (NULL);
    idxR = 0;
    if (list1 != NULL) {
        for (size_t idx1 = 0; idx1 < list1->length; idx1++)
            result->elements[idxR++] = list1->elements[idx1];
    }
    if (list2 != NULL) {
        for (size_t idx2 = 0; idx2 < list2->length; idx2++)
            result->elements[idxR++] = list2->elements[idx2];
    }
    return (result);
}

list_t *filter_list(list_t *list, bool (*filter)(list_element_t)) {
    list_t *result;
    size_t result_length, result_idx;

    result_length = 0;
    result_idx = 0;
    if (list == NULL || filter == NULL) return (NULL);
    for (size_t idx = 0; idx < list->length; idx++)
        if (filter(list->elements[idx]) == true) result_length++;
    result = allocate_new_list(result_length);
    if (result == NULL) return (NULL);
    for (size_t idx = 0; idx < list->length; idx++)
        if (filter(list->elements[idx]) == true)
            result->elements[result_idx++] = list->elements[idx];
    return (result);
}

size_t length_list(list_t *list) {
    if (list == NULL) return (0);
    return (list->length);
}

list_t *map_list(list_t *list, list_element_t (*map)(list_element_t)) {
    list_t *result;

    if (list == NULL || map == NULL) return (NULL);
    result = allocate_new_list(list->length);
    if (list == NULL) return (NULL);
    for (size_t idx = 0; idx < list->length; idx++)
        result->elements[idx] = map(list->elements[idx]);
    return (result);
}

list_element_t foldl_list(list_t *list, list_element_t initial,
                          list_element_t (*foldl)(list_element_t,
                                                  list_element_t)) {
    if (list == NULL || foldl == NULL) return (0);

    for (size_t idx = 0; idx < list->length; idx++)
        initial = foldl(list->elements[idx], initial);
    return (initial);
}

list_element_t foldr_list(list_t *list, list_element_t initial,
                          list_element_t (*foldr)(list_element_t,
                                                  list_element_t)) {
    if (list == NULL || foldr == NULL) return (0);

    for (size_t idx = 0; idx < list->length; idx++)
        initial = foldr(list->elements[list->length - 1 - 1 * idx], initial);
    return (initial);
}

list_t *reverse_list(list_t *list) {
    list_t *result;

    if (list == NULL) return (NULL);
    result = allocate_new_list(list->length);
    for (size_t idx = 0; idx < list->length; idx++) {
        result->elements[idx] = list->elements[list->length - 1 - 1 * idx];
    }
    return (result);
}
