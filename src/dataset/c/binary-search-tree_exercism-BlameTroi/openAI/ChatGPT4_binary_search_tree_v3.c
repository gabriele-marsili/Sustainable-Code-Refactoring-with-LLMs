#include "binary_search_tree.h"
#include <stdlib.h>
#include <string.h>

// utility function prototypes
static void *zalloc(size_t s);
static int countNodes(const node_t *tree);
static void insertNode(node_t *root, node_t *n);
static void dataInOrder(const node_t *tree, size_t *i, int data[]);

// API for the exercise:

node_t *build_tree(int *data, size_t count) {
	if (!data || count == 0)
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

void free_tree(node_t *tree) {
	if (!tree)
		return;
	free_tree(tree->left);
	free_tree(tree->right);
	free(tree);
}

int *sorted_data(node_t *tree) {
	if (!tree)
		return NULL;

	int node_count = countNodes(tree);
	int *data = malloc(node_count * sizeof(int));
	if (!data)
		return NULL;

	size_t i = 0;
	dataInOrder(tree, &i, data);
	return data;
}

// utility function implementation

static void *zalloc(size_t s) {
	void *ptr = calloc(1, s);
	if (!ptr) {
		exit(EXIT_FAILURE);
	}
	return ptr;
}

static void insertNode(node_t *root, node_t *n) {
	while (1) {
		if (n->data <= root->data) {
			if (!root->left) {
				root->left = n;
				return;
			}
			root = root->left;
		} else {
			if (!root->right) {
				root->right = n;
				return;
			}
			root = root->right;
		}
	}
}

static int countNodes(const node_t *tree) {
	if (!tree)
		return 0;
	return 1 + countNodes(tree->left) + countNodes(tree->right);
}

static void dataInOrder(const node_t *tree, size_t *i, int data[]) {
	if (!tree)
		return;
	dataInOrder(tree->left, i, data);
	data[(*i)++] = tree->data;
	dataInOrder(tree->right, i, data);
}