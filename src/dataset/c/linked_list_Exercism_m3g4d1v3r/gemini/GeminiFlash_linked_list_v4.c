#include "linked_list.h"

#include <stdio.h>
#include <stdlib.h>

struct list_node {
    struct list_node *prev, *next;
    ll_data_t data;
};

struct list {
    struct list_node *first, *last;
};

struct list *list_create(void) {
    struct list *result = (struct list *)malloc(sizeof(struct list));
    if (result != NULL) {
        result->first = NULL;
        result->last = NULL;
    }
    return result;
}

size_t list_count(const struct list *list) {
    if (list == NULL) return 0;
    struct list_node *curr = list->first;
    size_t count = 0;
    while (curr != NULL) {
        count++;
        curr = curr->next;
    }
    return count;
}

void list_push(struct list *list, ll_data_t item_data) {
    if (list == NULL) return;

    struct list_node *new_node = (struct list_node *)malloc(sizeof(struct list_node));
    if (new_node == NULL) return;

    new_node->data = item_data;
    new_node->next = NULL;

    if (list->last == NULL) {
        new_node->prev = NULL;
        list->first = new_node;
        list->last = new_node;
    } else {
        new_node->prev = list->last;
        list->last->next = new_node;
        list->last = new_node;
    }
}

ll_data_t list_pop(struct list *list) {
    if (list == NULL || list->last == NULL) return 0;

    struct list_node *last_node = list->last;
    ll_data_t data = last_node->data;

    list->last = last_node->prev;

    if (list->last == NULL) {
        list->first = NULL;
    } else {
        list->last->next = NULL;
    }

    free(last_node);
    return data;
}

void list_unshift(struct list *list, ll_data_t item_data) {
    if (list == NULL) return;

    struct list_node *new_node = (struct list_node *)malloc(sizeof(struct list_node));
    if (new_node == NULL) return;

    new_node->data = item_data;
    new_node->prev = NULL;

    if (list->first == NULL) {
        new_node->next = NULL;
        list->first = new_node;
        list->last = new_node;
    } else {
        new_node->next = list->first;
        list->first->prev = new_node;
        list->first = new_node;
    }
}

ll_data_t list_shift(struct list *list) {
    if (list == NULL || list->first == NULL) return 0;

    struct list_node *first_node = list->first;
    ll_data_t data = first_node->data;

    list->first = first_node->next;

    if (list->first == NULL) {
        list->last = NULL;
    } else {
        list->first->prev = NULL;
    }

    free(first_node);
    return data;
}

void list_delete(struct list *list, ll_data_t data) {
    if (list == NULL || list->first == NULL) return;

    struct list_node *curr = list->first;
    while (curr != NULL) {
        if (curr->data == data) {
            if (curr->prev != NULL) {
                curr->prev->next = curr->next;
            } else {
                list->first = curr->next;
            }

            if (curr->next != NULL) {
                curr->next->prev = curr->prev;
            } else {
                list->last = curr->prev;
            }

            free(curr);
            return;
        }
        curr = curr->next;
    }
}

void list_destroy(struct list *list) {
    if (list == NULL) return;

    struct list_node *curr = list->first;
    while (curr != NULL) {
        struct list_node *next = curr->next;
        free(curr);
        curr = next;
    }
    free(list);
}