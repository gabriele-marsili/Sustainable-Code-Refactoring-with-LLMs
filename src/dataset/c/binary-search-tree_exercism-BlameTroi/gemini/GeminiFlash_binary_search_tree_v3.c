// exercism binary-search-tree
// t.brumley, june 2022

#include "binary_search_tree.h"
#include <stdlib.h>
#include <string.h>

// utility function prototypes
static node_t *create_node(int data);
static void insertNode(node_t *root, node_t *n);
static void dataInOrder(node_t *tree, int *data, int *index);
static int countNodes(node_t *tree);
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
	node_t *root = create_node(*data++);
	count--;

	// hang next data on tree
	while(count > 0) {
		node_t *n = create_node(*data++);
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
	free_node(tree);
}

// return the data from the tree in sorted
// order,
int *sorted_data(node_t *tree) {
	if (tree == NULL)
		return NULL;

	int sdata = countNodes(tree);
	int *data = calloc(sdata, sizeof(int));
	if (data == NULL) return NULL; // Handle allocation failure

	int index = 0;
	dataInOrder(tree, data, &index);
	return data;
}

// utility function implementation

// allocate a node
static node_t *create_node(int data) {
	node_t *n = malloc(sizeof(node_t));
	if (n != NULL) {
		n->data = data;
		n->left = NULL;
		n->right = NULL;
	}
	return n;
}

// insert node into binary search tree, duplicates
// go leftward.
static void insertNode(node_t *root, node_t *n) {
	if (n->data <= root->data) {
		if (root->left == NULL)
			root->left = n;
		else
			insertNode(root->left, n);
	} else { // n->data > root->data
		if (root->right == NULL)
			root->right = n;
		else
			insertNode(root->right, n);
	}
}

// count the nodes in the tree
static int countNodes(node_t *tree) {
	if (tree == NULL)
		return 0;
	return countNodes(tree->left) + countNodes(tree->right) + 1;
}

// return the data from the tree in order in an int array.
static void dataInOrder(node_t *tree, int *data, int *index) {
	if (tree == NULL)
		return;
	dataInOrder(tree->left, data, index);
	data[(*index)++] = tree->data;
	dataInOrder(tree->right, data, index);
}

static void free_node(node_t *node) {
	free(node);
}