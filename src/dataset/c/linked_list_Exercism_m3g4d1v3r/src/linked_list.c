#include "linked_list.h"

#include <stdio.h>

struct list_node {
    struct list_node *prev, *next;
    ll_data_t data;
};

struct list {
    struct list_node *first, *last;
};

struct list *list_create(void) {
    struct list *result;

    result = malloc(sizeof(struct list));
    result->first = NULL;
    result->last = NULL;
    return (result);
}

size_t list_count(const struct list *list) {
    struct list_node *curr;
    size_t count;

    count = 0;
    if (list == NULL) return (0);
    if (list->first == NULL && list->last == NULL) return (0);
    curr = list->first;
    while (curr != NULL) {
        curr = curr->next;
        count++;
    }
    return (count);
}

void list_push(struct list *list, ll_data_t item_data) {
    struct list_node *new_node;

    if (list == NULL) return;
    if (list->first == NULL && list->last == NULL) {
        new_node = malloc(sizeof(struct list_node));
        new_node->data = item_data;
        new_node->prev = NULL;
        new_node->next = NULL;
        list->first = new_node;
        list->last = list->first;
        return;
    } else if (list->first == NULL || list->last == NULL) {
        return;
    }
    new_node = malloc(sizeof(struct list_node));
    list->last->next = new_node;
    new_node->data = item_data;
    new_node->prev = list->last;
    new_node->next = NULL;
    list->last = new_node;
}

ll_data_t list_pop(struct list *list) {
    ll_data_t to_return;
    struct list_node *top_node;

    if (list == NULL) return (0);
    if (list->first == NULL || list->last == NULL) return (0);
    top_node = list->last;
    to_return = top_node->data;
    if (top_node->prev != NULL)
        top_node->prev->next = NULL;
    else
        list->first = NULL;
    list->last = top_node->prev;
    free(top_node);
    return (to_return);
}

void list_unshift(struct list *list, ll_data_t item_data) {
    struct list_node *new_node;

    if (list == NULL) return;
    if (list->first == NULL && list->last == NULL) {
        new_node = malloc(sizeof(struct list_node));
        new_node->data = item_data;
        new_node->prev = NULL;
        new_node->next = NULL;
        list->first = new_node;
        list->last = list->first;
        return;
    } else if (list->first == NULL || list->last == NULL) {
        return;
    }
    new_node = malloc(sizeof(struct list_node));
    list->first->prev = new_node;
    new_node->data = item_data;
    new_node->prev = NULL;
    new_node->next = list->first;
    list->first = new_node;
}

ll_data_t list_shift(struct list *list) {
    ll_data_t to_return;
    struct list_node *bottom_node;

    if (list == NULL) return (0);
    if (list->first == NULL || list->last == NULL) return (0);
    bottom_node = list->first;
    to_return = bottom_node->data;
    if (bottom_node->next != NULL)
        bottom_node->next->prev = NULL;
    else
        list->last = NULL;
    list->first = bottom_node->next;
    free(bottom_node);
    return (to_return);
}

void list_delete(struct list *list, ll_data_t data) {
    struct list_node *curr;

    if (list == NULL) return;
    curr = list->first;
    while (curr != NULL) {
        if (curr->data == data) {
            break;
        }
        curr = curr->next;
    }
    if (curr == NULL) return;
    if (list->first == list->last) {
        list->first = NULL;
        list->last = NULL;
    } else if (curr == list->first) {
        list->first = curr->next;
        curr->next->prev = NULL;
    } else if (curr == list->last) {
        list->last = curr->prev;
        curr->prev->next = NULL;
    } else {
        curr->next->prev = curr->prev;
        curr->prev->next = curr->next;
    }
    free(curr);
    return;
}

void list_destroy(struct list *list) {
    struct list_node *curr, *next;

    if (list == NULL) return;
    curr = list->first;
    while (curr != NULL) {
        next = curr->next;
        free(curr);
        curr = next;
    }
    free(list);
    return;
}
