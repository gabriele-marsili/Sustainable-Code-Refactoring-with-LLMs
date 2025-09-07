#include "list_ops.h"
#include <string.h>

list_t *allocate_new_list(size_t length);

list_t *allocate_new_list(size_t length) {
    if (length == 0) {
        list_t *result = malloc(sizeof(list_t));
        if (result == NULL) return NULL;
        result->length = 0;
        result->elements = NULL;
        return result;
    }
    
    list_t *result = malloc(sizeof(list_t) + sizeof(list_element_t) * length);
    if (result == NULL) return NULL;
    
    result->length = length;
    result->elements = (list_element_t *)(result + 1);
    return result;
}

list_t *new_list(size_t length, list_element_t elements[]) {
    list_t *result = allocate_new_list(length);
    if (result == NULL) return NULL;
    
    if (length > 0 && elements != NULL) {
        memcpy(result->elements, elements, sizeof(list_element_t) * length);
    }
    return result;
}

void delete_list(list_t *list) {
    free(list);
}

list_t *append_list(list_t *list1, list_t *list2) {
    size_t len1 = (list1 != NULL) ? list1->length : 0;
    size_t len2 = (list2 != NULL) ? list2->length : 0;
    size_t result_len = len1 + len2;
    
    list_t *result = allocate_new_list(result_len);
    if (result == NULL) return NULL;
    
    if (len1 > 0) {
        memcpy(result->elements, list1->elements, sizeof(list_element_t) * len1);
    }
    if (len2 > 0) {
        memcpy(result->elements + len1, list2->elements, sizeof(list_element_t) * len2);
    }
    
    return result;
}

list_t *filter_list(list_t *list, bool (*filter)(list_element_t)) {
    if (list == NULL || filter == NULL) return NULL;
    
    size_t result_length = 0;
    for (size_t idx = 0; idx < list->length; idx++) {
        if (filter(list->elements[idx])) result_length++;
    }
    
    list_t *result = allocate_new_list(result_length);
    if (result == NULL) return NULL;
    
    size_t result_idx = 0;
    for (size_t idx = 0; idx < list->length; idx++) {
        if (filter(list->elements[idx])) {
            result->elements[result_idx++] = list->elements[idx];
        }
    }
    
    return result;
}

size_t length_list(list_t *list) {
    return (list != NULL) ? list->length : 0;
}

list_t *map_list(list_t *list, list_element_t (*map)(list_element_t)) {
    if (list == NULL || map == NULL) return NULL;
    
    list_t *result = allocate_new_list(list->length);
    if (result == NULL) return NULL;
    
    for (size_t idx = 0; idx < list->length; idx++) {
        result->elements[idx] = map(list->elements[idx]);
    }
    
    return result;
}

list_element_t foldl_list(list_t *list, list_element_t initial,
                          list_element_t (*foldl)(list_element_t,
                                                  list_element_t)) {
    if (list == NULL || foldl == NULL) return initial;
    
    list_element_t accumulator = initial;
    for (size_t idx = 0; idx < list->length; idx++) {
        accumulator = foldl(list->elements[idx], accumulator);
    }
    
    return accumulator;
}

list_element_t foldr_list(list_t *list, list_element_t initial,
                          list_element_t (*foldr)(list_element_t,
                                                  list_element_t)) {
    if (list == NULL || foldr == NULL) return initial;
    
    list_element_t accumulator = initial;
    for (size_t idx = 0; idx < list->length; idx++) {
        accumulator = foldr(list->elements[list->length - 1 - idx], accumulator);
    }
    
    return accumulator;
}

list_t *reverse_list(list_t *list) {
    if (list == NULL) return NULL;
    
    list_t *result = allocate_new_list(list->length);
    if (result == NULL) return NULL;
    
    for (size_t idx = 0; idx < list->length; idx++) {
        result->elements[idx] = list->elements[list->length - 1 - idx];
    }
    
    return result;
}