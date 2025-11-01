// exercism binary-search-tree
// optimized version

#include "binary_search_tree.h"
#include <stdlib.h>
#include <string.h>

// utility function prototypes
static void *zalloc(size_t s);
static void insertNode(node_t *root, node_t *n);
static void dataInOrder(node_t *tree, size_t *i, int data[]);

// API for the exercise:

// build a binary tree from an array of ints.
// duplicates allowed and are added on left
node_t *build_tree(int *data, size_t count) {
	if (count == 0 || data == NULL)
		return NULL;

	node_t *root = zalloc(sizeof(node_t));
	root->data = data[0];

	for (size_t i = 1; i < count; i++) {
		node_t *n = zalloc(sizeof(node_t));
		n->data = data[i];
		insertNode(root, n);
	}

	return root;
}

// free the whole tree
void free_tree(node_t *tree) {
	if (tree == NULL)
		return;

	free_tree(tree->left);
	free_tree(tree->right);
	free(tree);
}

// return the data from the tree in sorted order
int *sorted_data(node_t *tree) {
	if (tree == NULL)
		return NULL;

	int node_count = 0;
	node_t *stack[1024]; // fixed-size stack for iterative traversal
	node_t *current = tree;

	// Count nodes iteratively to avoid recursion overhead
	while (current || node_count > 0) {
		if (current) {
			stack[node_count++] = current;
			current = current->left;
		} else {
			current = stack[--node_count];
			current = current->right;
		}
	}

	// Allocate space for sorted data
	int *data = calloc(node_count, sizeof(int));
	size_t i = 0;
	dataInOrder(tree, &i, data);
	return data;
}

// utility function implementation

// allocate a block of memory and set it to zeros.
static void *zalloc(size_t s) {
	void *ptr = malloc(s);
	if (ptr)
		memset(ptr, 0, s);
	return ptr;
}

// insert node into binary search tree, duplicates
// go leftward.
static void insertNode(node_t *root, node_t *n) {
	while (1) {
		if (n->data <= root->data) {
			if (root->left == NULL) {
				root->left = n;
				return;
			}
			root = root->left;
		} else {
			if (root->right == NULL) {
				root->right = n;
				return;
			}
			root = root->right;
		}
	}
}

// return the data from the tree in order in an int array.
static void dataInOrder(node_t *tree, size_t *i, int data[]) {
	node_t *stack[1024]; // fixed-size stack for iterative traversal
	size_t stack_size = 0;
	node_t *current = tree;

	while (current || stack_size > 0) {
		if (current) {
			stack[stack_size++] = current;
			current = current->left;
		} else {
			current = stack[--stack_size];
			data[(*i)++] = current->data;
			current = current->right;
		}
	}
}