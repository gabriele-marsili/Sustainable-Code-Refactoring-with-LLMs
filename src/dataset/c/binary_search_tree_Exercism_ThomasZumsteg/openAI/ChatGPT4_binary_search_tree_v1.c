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
        *tree_p = malloc(sizeof(node_t));
        (*tree_p)->left = (*tree_p)->right = NULL;
        (*tree_p)->data = elements[e];
    }
    return root;
}

void inorder_traversal(node_t *node, int *result, int *index) {
    if (!node) return;
    inorder_traversal(node->left, result, index);
    result[(*index)++] = node->data;
    inorder_traversal(node->right, result, index);
}

int *sorted_data(node_t *tree) {
    int *result = malloc(sizeof(int) * MAX_SIZE);
    int index = 0;
    inorder_traversal(tree, result, &index);
    return result;
}