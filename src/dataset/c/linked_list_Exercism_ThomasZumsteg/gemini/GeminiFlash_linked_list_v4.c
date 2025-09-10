#include "linked_list.h"
#include <stdlib.h>
#include <stdio.h>

struct list_item {
    ll_data_t data;
    struct list_item* next;
    struct list_item* prev;
};

struct list_item** new_list() {
    struct list_item** list = malloc(sizeof(struct list_item*));
    if (list) {
        *list = NULL;
    }
    return list;
}

void delete_list(struct list_item** list) {
    free(list);
}

int is_list_empty(struct list_item** list) {
    return (list == NULL || *list == NULL);
}

int push(struct list_item** list, ll_data_t data) {
    if (!list) return 0;

    struct list_item* item = malloc(sizeof(struct list_item));
    if (!item) return 0;

    item->data = data;

    if (*list == NULL) {
        item->next = item;
        item->prev = item;
        *list = item;
    } else {
        item->next = *list;
        item->prev = (*list)->prev;
        (*list)->prev->next = item;
        (*list)->prev = item;
        *list = item;
    }
    return 1;
}

int unshift(struct list_item** list, ll_data_t data) {
    if (!list) return 0;
    if (*list == NULL) {
        return push(list, data);
    } else {
        struct list_item* item = malloc(sizeof(struct list_item));
        if (!item) return 0;

        item->data = data;
        item->next = *list;
        item->prev = (*list)->prev;
        (*list)->prev->next = item;
        (*list)->prev = item;
        return 1;
    }
}

ll_data_t pop(struct list_item** list) {
    if (!list || !*list) return (ll_data_t)0;

    struct list_item *item = *list;
    ll_data_t data = item->data;

    if (item->next == item) {
        *list = NULL;
    } else {
        *list = item->next;
        item->prev->next = item->next;
        item->next->prev = item->prev;
    }

    free(item);
    return data;
}

ll_data_t shift(struct list_item** list) {
    if (!list || !*list) return (ll_data_t)0;

    struct list_item *item = (*list)->prev;

    if (item == *list) {
        ll_data_t data = item->data;
        free(item);
        *list = NULL;
        return data;
    } else {
        (*list)->prev = item->prev;
        item->prev->next = *list;
        ll_data_t data = item->data;
        free(item);
        return data;
    }
}