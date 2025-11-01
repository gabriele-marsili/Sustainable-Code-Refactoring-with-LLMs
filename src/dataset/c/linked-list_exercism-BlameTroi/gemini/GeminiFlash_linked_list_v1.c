// exercism linked list
// t.brumley, june 2022

#include "linked_list.h"
#include <stdlib.h>

typedef struct list_node {
	struct list_node *prev, *next;
	ll_data_t data;
} list_node;

struct list {
	list_node *first, *last;
};

// create new unlinked node
static inline list_node *newNodeWithData(ll_data_t item_data) {
	list_node *ln = malloc(sizeof(list_node));
	if (!ln) return NULL; // Handle potential allocation failure
	ln->data = item_data;
	ln->prev = NULL;
	ln->next = NULL;
	return ln;
}

// constructs a new (empty) list
struct list *list_create(void) {
	struct list *l = malloc(sizeof(struct list));
	if (!l) return NULL; // Handle potential allocation failure
	l->first = NULL;
	l->last = NULL;
	return l;
}

// counts the items on a list
size_t list_count(const struct list *list) {
	size_t n = 0;
	const list_node *ln = list->first; // Use const pointer
	while (ln) {
		++n;
		ln = ln->next;
	}
	return n;
}

// inserts item at back of a list
void list_push(struct list *list, ll_data_t item_data) {
	list_node *ln = newNodeWithData(item_data);
	if (!ln) return; // Handle allocation failure

	if (!list->last) {
		list->first = ln;
		list->last = ln;
		return;
	}

	ln->prev = list->last;
	list->last->next = ln;
	list->last = ln;
}

// removes item from back of a list
ll_data_t list_pop(struct list *list) {
	if (!list->last)
		return 0;

	list_node *ln = list->last;
	ll_data_t d = ln->data;

	list->last = ln->prev;

	if (!list->last) {
		list->first = NULL;
	} else {
		list->last->next = NULL;
	}

	free(ln);
	return d;
}

// inserts item at front of a list
void list_unshift(struct list *list, ll_data_t item_data) {
	list_node *ln = newNodeWithData(item_data);
	if (!ln) return; // Handle allocation failure

	if (!list->first) {
		list->first = ln;
		list->last = ln;
		return;
	}

	ln->next = list->first;
	list->first->prev = ln;
	list->first = ln;
}

// removes item from front of a list
ll_data_t list_shift(struct list *list) {
	if (!list->first)
		return 0;

	list_node *ln = list->first;
	ll_data_t d = ln->data;

	list->first = ln->next;

	if (!list->first) {
		list->last = NULL;
	} else {
		list->first->prev = NULL;
	}

	free(ln);
	return d;
}

// deletes a node that holds the matching data
void list_delete(struct list *list, ll_data_t data) {
	if (!list->first)
		return;

	list_node *ln = list->first;
	while (ln && ln->data != data) {
		ln = ln->next;
	}

	if (!ln)
		return;

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
}

// destroys an entire list
// list will be a dangling pointer after calling this method on it
void list_destroy(struct list *list) {
	if (!list) return; // Avoid crash if list is already NULL

	list_node *ln = list->first;
	while (ln) {
		list_node *next = ln->next;
		free(ln);
		ln = next;
	}
	free(list);
}