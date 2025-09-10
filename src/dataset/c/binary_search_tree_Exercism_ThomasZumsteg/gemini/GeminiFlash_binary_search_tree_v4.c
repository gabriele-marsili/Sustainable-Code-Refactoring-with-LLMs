#include "binary_search_tree.h"
#include <stdlib.h>

#define MAX_SIZE 10

node_t *build_tree(int elements[], int n_elements) {
    node_t *root = NULL;
    for (int i = 0; i < n_elements; i++) {
        node_t **curr = &root;
        while (*curr != NULL) {
            if (elements[i] < (*curr)->data) {
                curr = &(*curr)->left;
            } else {
                curr = &(*curr)->right;
            }
        }
        *curr = (node_t *)malloc(sizeof(node_t));
        if (*curr == NULL) {
            // Handle memory allocation failure (important for robustness)
            return root; // Or exit, depending on desired behavior
        }
        (*curr)->data = elements[i];
        (*curr)->left = NULL;
        (*curr)->right = NULL;
    }
    return root;
}

void inorder_traversal(node_t *node, int *result, int *index) {
    if (node != NULL) {
        inorder_traversal(node->left, result, index);
        result[(*index)++] = node->data;
        inorder_traversal(node->right, result, index);
    }
}

int *sorted_data(node_t *tree) {
    int *result = (int *)malloc(sizeof(int) * MAX_SIZE);
    if (result == NULL) {
        return NULL; // Handle memory allocation failure
    }

    int index = 0;
    inorder_traversal(tree, result, &index);

    return result;
}