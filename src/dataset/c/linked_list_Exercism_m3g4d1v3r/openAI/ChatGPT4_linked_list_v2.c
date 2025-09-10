#include "linked_list.h"

#include <stdio.h>

struct list_node {
    struct list_node *prev, *next;
    ll_data_t data;
};

struct list {
    struct list_node *first, *last;
    size_t count; // Added to track the number of elements
};

struct list *list_create(void) {
    struct list *result = malloc(sizeof(struct list));
    if (!result) return NULL; // Handle allocation failure
    result->first = NULL;
    result->last = NULL;
    result->count = 0;
    return result;
}

size_t list_count(const struct list *list) {
    return list ? list->count : 0; // Use the count field directly
}

void list_push(struct list *list, ll_data_t item_data) {
    if (!list) return;

    struct list_node *new_node = malloc(sizeof(struct list_node));
    if (!new_node) return; // Handle allocation failure

    new_node->data = item_data;
    new_node->prev = list->last;
    new_node->next = NULL;

    if (list->last) {
        list->last->next = new_node;
    } else {
        list->first = new_node;
    }

    list->last = new_node;
    list->count++;
}

ll_data_t list_pop(struct list *list) {
    if (!list || !list->last) return 0;

    struct list_node *top_node = list->last;
    ll_data_t to_return = top_node->data;

    list->last = top_node->prev;
    if (list->last) {
        list->last->next = NULL;
    } else {
        list->first = NULL;
    }

    free(top_node);
    list->count--;
    return to_return;
}

void list_unshift(struct list *list, ll_data_t item_data) {
    if (!list) return;

    struct list_node *new_node = malloc(sizeof(struct list_node));
    if (!new_node) return; // Handle allocation failure

    new_node->data = item_data;
    new_node->prev = NULL;
    new_node->next = list->first;

    if (list->first) {
        list->first->prev = new_node;
    } else {
        list->last = new_node;
    }

    list->first = new_node;
    list->count++;
}

ll_data_t list_shift(struct list *list) {
    if (!list || !list->first) return 0;

    struct list_node *bottom_node = list->first;
    ll_data_t to_return = bottom_node->data;

    list->first = bottom_node->next;
    if (list->first) {
        list->first->prev = NULL;
    } else {
        list->last = NULL;
    }

    free(bottom_node);
    list->count--;
    return to_return;
}

void list_delete(struct list *list, ll_data_t data) {
    if (!list) return;

    struct list_node *curr = list->first;
    while (curr) {
        if (curr->data == data) {
            if (curr->prev) {
                curr->prev->next = curr->next;
            } else {
                list->first = curr->next;
            }

            if (curr->next) {
                curr->next->prev = curr->prev;
            } else {
                list->last = curr->prev;
            }

            free(curr);
            list->count--;
            return;
        }
        curr = curr->next;
    }
}

void list_destroy(struct list *list) {
    if (!list) return;

    struct list_node *curr = list->first;
    while (curr) {
        struct list_node *next = curr->next;
        free(curr);
        curr = next;
    }

    free(list);
}