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
static inline list_node *newNodeWithData(ll_data_t item_data) {
	list_node *ln = (list_node *)malloc(sizeof(list_node));
	if (!ln) return NULL; // Handle allocation failure
	ln->data = item_data;
	ln->prev = ln->next = NULL;
	return ln;
}

// constructs a new (empty) list
struct list *list_create(void) {
	struct list *l = (struct list *)malloc(sizeof(struct list));
	if (!l) return NULL; // Handle allocation failure
	l->first = l->last = NULL;
	l->size = 0;
	return l;
}

// counts the items on a list
size_t list_count(const struct list *list) {
	return list->size;
}

// inserts item at back of a list
void list_push(struct list *list, ll_data_t item_data) {
	list_node *ln = newNodeWithData(item_data);
	if (!ln) return; // Handle allocation failure

	if (!list->last) {
		list->first = list->last = ln;
	} else {
		ln->prev = list->last;
		list->last->next = ln;
		list->last = ln;
	}
	list->size++;
}

// removes item from back of a list
ll_data_t list_pop(struct list *list) {
	if (!list->last) return 0;

	list_node *ln = list->last;
	ll_data_t d = ln->data;

	list->last = ln->prev;
	if (list->last) {
		list->last->next = NULL;
	} else {
		list->first = NULL;
	}

	free(ln);
	list->size--;
	return d;
}

// inserts item at front of a list
void list_unshift(struct list *list, ll_data_t item_data) {
	list_node *ln = newNodeWithData(item_data);
	if (!ln) return; // Handle allocation failure

	if (!list->first) {
		list->first = list->last = ln;
	} else {
		ln->next = list->first;
		list->first->prev = ln;
		list->first = ln;
	}
	list->size++;
}

// removes item from front of a list
ll_data_t list_shift(struct list *list) {
	if (!list->first) return 0;

	list_node *ln = list->first;
	ll_data_t d = ln->data;

	list->first = ln->next;
	if (list->first) {
		list->first->prev = NULL;
	} else {
		list->last = NULL;
	}

	free(ln);
	list->size--;
	return d;
}

// deletes a node that holds the matching data
void list_delete(struct list *list, ll_data_t data) {
	if (!list->first) return;

	list_node *ln = list->first;
	while (ln && ln->data != data) {
		ln = ln->next;
	}

	if (!ln) return;

	if (ln->prev) {
		ln->prev->next = ln->next;
	} else {
		list->first = ln->next;
	}

	if (ln->next) {
		ln->next->prev = ln->prev;
	} else {
		list->last = ln->prev;
	}

	free(ln);
	list->size--;
}

// destroys an entire list
void list_destroy(struct list *list) {
	list_node *ln = list->first;
	while (ln) {
		list_node *next = ln->next;
		free(ln);
		ln = next;
	}
	free(list);
}