#include "binary_search_tree.h"
#include <stdlib.h>

static void insertNode(node_t *root, int data);
static void dataInOrder(node_t *tree, size_t *i, int data[]);
static int countNodes(node_t *tree);

node_t *build_tree(int *data, size_t count) {
    if (count == 0 || data == NULL)
        return NULL;

    node_t *root = calloc(1, sizeof(node_t));
    if (!root) return NULL;
    
    root->data = data[0];

    for (size_t i = 1; i < count; i++) {
        insertNode(root, data[i]);
    }

    return root;
}

void free_tree(node_t *tree) {
    if (tree == NULL)
        return;
    free_tree(tree->left);
    free_tree(tree->right);
    free(tree);
}

int *sorted_data(node_t *tree) {
    if (tree == NULL)
        return NULL;

    int node_count = countNodes(tree);
    int *data = malloc(node_count * sizeof(int));
    if (!data) return NULL;
    
    size_t i = 0;
    dataInOrder(tree, &i, data);
    return data;
}

static void insertNode(node_t *root, int data) {
    node_t **current = (data <= root->data) ? &root->left : &root->right;
    
    while (*current != NULL) {
        root = *current;
        current = (data <= root->data) ? &root->left : &root->right;
    }
    
    *current = calloc(1, sizeof(node_t));
    if (*current) {
        (*current)->data = data;
    }
}

static int countNodes(node_t *tree) {
    if (tree == NULL)
        return 0;
    return 1 + countNodes(tree->left) + countNodes(tree->right);
}

static void dataInOrder(node_t *tree, size_t *i, int data[]) {
    if (tree == NULL)
        return;
    dataInOrder(tree->left, i, data);
    data[(*i)++] = tree->data;
    dataInOrder(tree->right, i, data);
}