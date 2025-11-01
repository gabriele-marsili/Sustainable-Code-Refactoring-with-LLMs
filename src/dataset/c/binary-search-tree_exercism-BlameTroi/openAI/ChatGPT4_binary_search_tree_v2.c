#include "binary_search_tree.h"
#include <stdlib.h>
#include <string.h>

// utility function prototypes
static void *zalloc(size_t s);
static void insertNode(node_t *root, node_t *n);
static void dataInOrder(node_t *tree, int **data);

// API for the exercise:

// build a binary tree from an array of ints.
// duplicates allowed and are added on left
node_t *build_tree(int *data, size_t count) {
	if (count == 0 || data == NULL)
		return NULL;

	node_t *root = (node_t *)zalloc(sizeof(node_t));
	root->data = data[0];

	for (size_t i = 1; i < count; i++) {
		node_t *n = (node_t *)zalloc(sizeof(node_t));
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
	node_t *stack[1024]; // Fixed-size stack to avoid recursion
	node_t *current = tree;

	// Count nodes iteratively
	while (current || node_count > 0) {
		if (current) {
			stack[node_count++] = current;
			current = current->left;
		} else {
			current = stack[--node_count];
			current = current->right;
		}
	}
	//