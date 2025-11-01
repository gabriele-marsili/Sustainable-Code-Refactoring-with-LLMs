// exercism binary-search-tree
// t.brumley, june 2022

#include "binary_search_tree.h"
#include <stdlib.h>
#include <string.h>

// utility function prototypes
static void insertNode(node_t *root, node_t *n);
static void dataInOrder(node_t *tree, int **data_ptr);

// API for the exercise:

// build a binary tree from an array of ints.
// duplicates allowed and are added on left
node_t *build_tree(
		int *data,
		size_t count) {

	if (count == 0 || data == NULL)
		return NULL;

	node_t *root = calloc(1, sizeof(node_t));
	if (!root) return NULL;
	
	root->data = data[0];

	for (size_t i = 1; i < count; i++) {
		node_t *n = calloc(1, sizeof(node_t));
		if (!n) {
			free_tree(root);
			return NULL;
		}
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

	size_t count = 0;
	node_t *stack[1000];
	int stack_top = -1;
	node_t *current = tree;
	
	// Count nodes iteratively
	while (current != NULL || stack_top >= 0) {
		while (current != NULL) {
			stack[++stack_top] = current;
			current = current->left;
		}
		current = stack[stack_top--];
		count++;
		current = current->right;
	}

	int *data = malloc(count * sizeof(int));
	if (!data) return NULL;
	
	// Reset for in-order traversal
	stack_top = -1;
	current = tree;
	int *data_ptr = data;
	
	while (current != NULL || stack_top >= 0) {
		while (current != NULL) {
			stack[++stack_top] = current;
			current = current->left;
		}
		current = stack[stack_top--];
		*data_ptr++ = current->data;
		current = current->right;
	}
	
	return data;
}

// utility function implementation

// insert node into binary search tree, duplicates go leftward
static void insertNode(node_t *root, node_t *n) {
	node_t *current = root;
	
	while (1) {
		if (n->data <= current->data) {
			if (current->left == NULL) {
				current->left = n;
				break;
			}
			current = current->left;
		} else {
			if (current->right == NULL) {
				current->right = n;
				break;
			}
			current = current->right;
		}
	}
}

// return the data from the tree in order in an int array
static void dataInOrder(node_t *tree, int **data_ptr) {
	if (tree == NULL)
		return;
	dataInOrder(tree->left, data_ptr);
	*(*data_ptr)++ = tree->data;
	dataInOrder(tree->right, data_ptr);
}