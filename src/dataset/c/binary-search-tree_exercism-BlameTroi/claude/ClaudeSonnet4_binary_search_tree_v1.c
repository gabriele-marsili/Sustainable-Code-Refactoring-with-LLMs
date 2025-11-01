// exercism binary-search-tree
// t.brumley, june 2022

#include "binary_search_tree.h"
#include <stdlib.h>

// utility function prototypes
static int countNodes(node_t *tree);
static void insertNode(node_t *root, node_t *n);
static void dataInOrder(node_t *tree, size_t *i, int data[]);

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
	node_t *root = (node_t *)calloc(1, sizeof(node_t));
	root->data = *data++;
	count--;

	// hang next data on tree
	while(count > 0) {
		node_t *n = (node_t *)calloc(1, sizeof(node_t));
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

	// allocate space to store the data
	size_t i = 0;
	int sdata = countNodes(tree);
	int *data = (int *)calloc(sdata, sizeof(int));
	dataInOrder(tree, &i, data);
	return data;
}

// utility function implementation

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
static void dataInOrder(node_t *tree, size_t *i, int data[]) {
	if (tree == NULL)
		return;
	dataInOrder(tree->left, i, data);
	data[(*i)++] = tree->data;
	dataInOrder(tree->right, i, data);
}