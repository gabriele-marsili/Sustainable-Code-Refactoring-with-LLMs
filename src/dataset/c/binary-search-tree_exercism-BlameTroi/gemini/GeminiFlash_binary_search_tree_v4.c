// exercism binary-search-tree
// t.brumley, june 2022

#include "binary_search_tree.h"
#include <stdlib.h>
#include <string.h>

// utility function prototypes
static void *zalloc(size_t s);
static int countNodes(node_t *tree);
static void insertNode(node_t *root, node_t *n);
static void dataInOrder(node_t *tree, int *i, int data[]);

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
	root->data = *data++;
	count--;

	// hang next data on tree
	while(count > 0) {
		node_t *n = (node_t *)zalloc(sizeof(node_t));
		if (!n) { // Handle allocation failure
			free_tree(root);
			return NULL;
		}
		n->data = *data++;
		count--;
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

// return the data from the tree in sorted
// order,
int *sorted_data(node_t *tree) {
	if (tree == NULL)
		return NULL;

	int sdata = countNodes(tree);
	if (sdata == 0) return NULL;

	int *data = calloc(sdata, sizeof(int));
	if (!data) return NULL; // Handle allocation failure

	int i = 0;
	dataInOrder(tree, &i, data);
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
	return 1 + countNodes(tree->left) + countNodes(tree->right);
}

// return the data from the tree in order in an int array.
static void dataInOrder(node_t *tree, int *i, int data[]) {
	if (tree == NULL)
		return;
	dataInOrder(tree->left, i, data);
	data[(*i)++] = tree->data;
	dataInOrder(tree->right, i, data);
}