#include "binary_search_tree.h"
#include <stdlib.h>

#define MAX_SIZE 10

node_t *build_tree(int elements[], int n_elements) {
    node_t *root = NULL;
    for (int e = 0; e < n_elements; e++) {
        node_t **tree_p = &root;
        while (*tree_p) {
            tree_p = ((*tree_p)->data < elements[e]) ? &(*tree_p)->right : &(*tree_p)->left;
        }
        *tree_p = (node_t *)calloc(1, sizeof(node_t));
        (*tree_p)->data = elements[e];
    }
    return root;
}

int *sorted_data(node_t *tree) {
    int *result = (int *)malloc(MAX_SIZE * sizeof(int));
    int r = 0, q = 0;
    node_t *stack[MAX_SIZE];
    while (tree || q > 0) {
        while (tree) {
            stack[q++] = tree;
            tree = tree->left;
        }
        tree = stack[--q];
        result[r++] = tree->data;
        tree = tree->right;
    }
    return result;
}