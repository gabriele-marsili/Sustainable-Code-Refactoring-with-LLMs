#include "linked_list.h"
#include <stdlib.h>

typedef struct list_node {
  struct list_node *prev, *next;
  ll_data_t data;
} list_node;

struct list {
  list_node *first, *last;
  size_t size;
};

// create new unlinked node
static list_node *newNodeWithData(ll_data_t item_data) {
  list_node *ln = malloc(sizeof(list_node));
  if (ln == NULL) {
    return NULL;
  }
  ln->data = item_data;
  ln->prev = NULL;
  ln->next = NULL;
  return ln;
}

// constructs a new (empty) list
struct list *list_create(void) {
  struct list *l = malloc(sizeof(struct list));
  if (l == NULL) {
    return NULL;
  }
  l->first = NULL;
  l->last = NULL;
  l->size = 0;
  return l;
}

// counts the items on a list
size_t list_count(const struct list *list) { return list->size; }

// inserts item at back of a list
void list_push(struct list *list, ll_data_t item_data) {
  list_node *ln = newNodeWithData(item_data);
  if (ln == NULL) {
    return;
  }

  if (list->last == NULL) {
    list->first = ln;
    list->last = ln;
  } else {
    ln->prev = list->last;
    list->last->next = ln;
    list->last = ln;
  }
  list->size++;
}

// removes item from back of a list
ll_data_t list_pop(struct list *list) {
  if (list->last == NULL) {
    return 0;
  }

  list_node *ln = list->last;
  ll_data_t d = ln->data;

  list->last = ln->prev;

  if (list->last == NULL) {
    list->first = NULL;
  } else {
    list->last->next = NULL;
  }

  free(ln);
  list->size--;
  return d;
}

// inserts item at front of a list
void list_unshift(struct list *list, ll_data_t item_data) {
  list_node *ln = newNodeWithData(item_data);
  if (ln == NULL) {
    return;
  }

  if (list->first == NULL) {
    list->first = ln;
    list->last = ln;
  } else {
    ln->next = list->first;
    list->first->prev = ln;
    list->first = ln;
  }
  list->size++;
}

// removes item from front of a list
ll_data_t list_shift(struct list *list) {
  if (list->first == NULL) {
    return 0;
  }

  list_node *ln = list->first;
  ll_data_t d = ln->data;

  if (list->first == list->last) {
    list->first = NULL;
    list->last = NULL;
  } else {
    list->first = ln->next;
    list->first->prev = NULL;
  }

  free(ln);
  list->size--;
  return d;
}

// deletes a node that holds the matching data
void list_delete(struct list *list, ll_data_t data) {
  if (list->first == NULL) {
    return;
  }

  list_node *ln = list->first;
  while (ln != NULL && ln->data != data) {
    ln = ln->next;
  }

  if (ln == NULL) {
    return;
  }

  if (ln->prev != NULL) {
    ln->prev->next = ln->next;
  } else {
    list->first = ln->next;
  }

  if (ln->next != NULL) {
    ln->next->prev = ln->prev;
  } else {
    list->last = ln->prev;
  }

  if (list->first == NULL) {
    list->last = NULL;
  }

  free(ln);
  list->size--;
}

// destroys an entire list
// list will be a dangling pointer after calling this method on it
void list_destroy(struct list *list) {
  if (list == NULL) return;

  list_node *ln = list->first;
  while (ln != NULL) {
    list_node *next = ln->next;
    free(ln);
    ln = next;
  }
  free(list);
}