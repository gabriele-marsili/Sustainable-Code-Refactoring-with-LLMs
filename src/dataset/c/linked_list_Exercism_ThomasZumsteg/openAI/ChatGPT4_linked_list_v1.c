#include "linked_list.h"
#include <stdlib.h>
#include <stdio.h>

struct list_item {
    ll_data_t data;
    struct list_item* next;
    struct list_item* prev;
};

struct list_item** new_list() {
    return calloc(1, sizeof(struct list_item*));
}

void delete_list(struct list_item** list) {
    if (!list) return;
    struct list_item* current = *list;
    if (current) {
        struct list_item* start = current;
        do {
            struct list_item* next = current->next;
            free(current);
            current = next;
        } while (current != start);
    }
    free(list);
}

int is_list_empty(struct list_item** list) {
    return !list || !*list;
}

int push(struct list_item** list, ll_data_t data) {
    if (!list) return 0;
    struct list_item* item = malloc(sizeof(struct list_item));
    if (!item) return 0;
    item->data = data;
    if (*list) {
        struct list_item* tail = (*list)->prev;
        item->next = *list;
        item->prev = tail;
        tail->next = item;
        (*list)->prev = item;
    } else {
        item->next = item;
        item->prev = item;
        *list = item;
    }
    return 1;
}

int unshift(struct list_item** list, ll_data_t data) {
    return push(list, data) && (*list = (*list)->prev, 1);
}

ll_data_t pop(struct list_item** list) {
    if (!list || !*list) return (ll_data_t){0}; // Assuming ll_data_t has a default value
    struct list_item* item = *list;
    ll_data_t data = item->data;
    if (item->next == item) {
        *list = NULL;
    } else {
        struct list_item* next = item->next;
        struct list_item* prev = item->prev;
        next->prev = prev;
        prev->next = next;
        *list = next;
    }
    free(item);
    return data;
}

ll_data_t shift(struct list_item** list) {
    if (!list || !*list) return (ll_data_t){0}; // Assuming ll_data_t has a default value
    *list = (*list)->prev;
    return pop(list);
}