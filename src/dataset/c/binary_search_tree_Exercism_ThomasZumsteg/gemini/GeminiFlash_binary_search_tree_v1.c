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
            // and return NULL or an error code.  For simplicity, we just return NULL here.
            return NULL;
        }
        new_node->data = elements[i];
        new_node->left = NULL;
        new_node->right = NULL;

        if (root == NULL) {
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

void inorder_traversal(node_t *node, int *result, int *index) {
    if (node != NULL) {
        inorder_traversal(node->left, result, index);
        result[(*index)++] = node->data;
        inorder_traversal(node->right, result, index);
    }
}

int *sorted_data(node_t *tree) {
    // Determine the size of the tree first
    int size = 0;
    node_t *current = tree;
    node_t *stack[100]; // Assuming a maximum depth of 100, adjust as needed
    int top = -1;

    while (current != NULL || top != -1) {
        while (current != NULL) {
            stack[++top] = current;
            current = current->left;
        }

        current = stack[top--];
        size++;
        current = current->right;
    }
    
    int *result = malloc(sizeof(int) * size);

    if (!result) {
        perror("Failed to allocate memory for result array");
        return NULL;
    }

    int index = 0;
    inorder_traversal(tree, result, &index);

    return result;
}