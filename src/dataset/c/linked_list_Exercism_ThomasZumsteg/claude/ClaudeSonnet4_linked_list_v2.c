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
    *list = NULL;
    return list;
}

void delete_list(struct list_item** list) { 
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
        item->prev = (*list)->prev;
        item->next = *list;
        (*list)->prev->next = item;
        (*list)->prev = item;
    } else {
        item->next = item;
        item->prev = item;
    }
    *list = item;
    return 1;
}

int unshift(struct list_item** list, ll_data_t data) {
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

ll_data_t pop(struct list_item** list) {
    struct list_item* item = *list;
    
    if (item->next == item) {
        *list = NULL;
    } else {
        *list = item->next;
        (*list)->prev = item->prev;
        item->prev->next = *list;
    }
    
    ll_data_t data = item->data;
    free(item);
    return data;
}

ll_data_t shift(struct list_item** list) {
    struct list_item* tail = (*list)->prev;
    
    if (tail == *list) {
        *list = NULL;
    } else {
        tail->prev->next = *list;
        (*list)->prev = tail->prev;
    }
    
    ll_data_t data = tail->data;
    free(tail);
    return data;
}