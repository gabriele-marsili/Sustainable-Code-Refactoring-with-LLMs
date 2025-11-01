// exercism binary-search-tree
// t.brumley, june 2022

#include "binary_search_tree.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h> // For debugging, remove in production

// utility function prototypes
static void *zalloc(size_t s);
static int countNodes(node_t *tree);
static void insertNode(node_t *root, node_t *n);
static void dataInOrder(node_t *tree, int *data, int *index);
static void free_node(node_t *node);

// API for the exercise:

// build a binary tree from an array of ints.
// duplicates allowed and are added on left
node_t *build_tree(
		int *data,
		size_t count) {

	// don't bother if nothing given
	if (count == 0 || data == NULL)
		return NULL;

	// create tree root
	node_t *root = (node_t *)zalloc(sizeof(node_t));
	if (!root) return NULL; // Handle allocation failure
	root->data = data[0];

	// hang next data on tree
	for (size_t i = 1; i < count; ++i) {
		node_t *n = (node_t *)zalloc(sizeof(node_t));
		if (!n) { // Handle allocation failure
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
    if (tree != NULL) {
        free_tree(tree->left);
        free_tree(tree->right);
        free_node(tree);
    }
}

static void free_node(node_t *node) {
    free(node);
}

// return the data from the tree in sorted
// order,
int *sorted_data(node_t *tree) {
	if (tree == NULL)
		return NULL;

	int sdata = countNodes(tree);
	if (sdata == 0) return NULL;

	int *data = calloc(sdata, sizeof(int));
	if (!data) return NULL; //Handle allocation failure

	int i = 0;
	dataInOrder(tree, data, &i);
	return data;
}

// utility function implementation

// allocate a block of memory and set it to zeros.
static void *zalloc(size_t s) {
	void *ptr = malloc(s);
	if (ptr) {
		memset(ptr, 0, s);
	}
	return ptr;
}

// insert node into binary search tree, duplicates
// go leftward.
static void insertNode(node_t *root, node_t *n) {
	node_t *current = root;
	while (1) {
		if (n->data <= current->data) {
			if (current->left == NULL) {
				current->left = n;
				break;
			} else {
				current = current->left;
			}
		} else {
			if (current->right == NULL) {
				current->right = n;
				break;
			} else {
				current = current->right;
			}
		}
	}
}

// count the nodes in the tree
static int countNodes(node_t *tree) {
	if (tree == NULL)
		return 0;

	size_t count = 1;
	if (tree->left)
		count += countNodes(tree->left);
	if (tree->right)
		count += countNodes(tree->right);
	return (int)count;
}

// return the data from the tree in order in an int array.
static void dataInOrder(node_t *tree, int *data, int *index) {
	if (tree == NULL)
		return;

	dataInOrder(tree->left, data, index);
	data[(*index)++] = tree->data;
	dataInOrder(tree->right, data, index);
}