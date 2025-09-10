#include "binary_search_tree.h"
#include <stdlib.h>
#include <stdio.h>

node_t *build_tree(int elements[], int n_elements) {
    node_t *root = NULL;
    for (int i = 0; i < n_elements; i++) {
        node_t *new_node = malloc(sizeof(node_t));
        if (!new_node) {
            perror("Failed to allocate memory for new node");
            // Handle memory allocation failure appropriately, e.g., free already allocated nodes
            exit(EXIT_FAILURE);
        }
        new_node->data = elements[i];
        new_node->left = NULL;
        new_node->right = NULL;

        if (!root) {
            root = new_node;
        } else {
            node_t *current = root;
            while (1) {
                if (elements[i] < current->data) {
                    if (current->left == NULL) {
                        current->left = new_node;
                        break;
                    } else {
                        current = current->left;
                    }
                } else {
                    if (current->right == NULL) {
                        current->right = new_node;
                        break;
                    } else {
                        current = current->right;
                    }
                }
            }
        }
    }
    return root;
}

void inorder_traversal(node_t *tree, int *result, int *index) {
    if (tree) {
        inorder_traversal(tree->left, result, index);
        result[(*index)++] = tree->data;
        inorder_traversal(tree->right, result, index);
    }
}

int *sorted_data(node_t *tree, int n_elements) {
    int *result = calloc(n_elements, sizeof(int));
    if (!result) {
        perror("Failed to allocate memory for result array");
        exit(EXIT_FAILURE);
    }
    int index = 0;
    inorder_traversal(tree, result, &index);
    return result;
}