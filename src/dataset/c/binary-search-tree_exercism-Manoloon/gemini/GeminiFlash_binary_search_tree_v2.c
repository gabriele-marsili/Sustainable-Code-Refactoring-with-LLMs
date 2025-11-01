#include "binary_search_tree.h"
#include <stdlib.h>

node_t *build_tree(int *tree_data, size_t tree_data_len) {
    if (tree_data == NULL || tree_data_len == 0) return NULL;

    node_t *root = NULL;
    for (size_t i = 0; i < tree_data_len; ++i) {
        node_t *new_node = malloc(sizeof(node_t));
        if (new_node == NULL) {
            // Handle memory allocation failure: free already allocated nodes
            free_tree(root);
            return NULL;
        }
        new_node->data = tree_data[i];
        new_node->left = NULL;
        new_node->right = NULL;

        if (root == NULL) {
            root = new_node;
        } else {
            node_t *current = root;
            while (1) {
                if (tree_data[i] <= current->data) {
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


void free_tree(node_t *tree) {
    if (tree == NULL) return;

    node_t *left = tree->left;
    node_t *right = tree->right;
    free(tree);
    free_tree(left);
    free_tree(right);
}


static void fill_ordered(node_t *tree, int *dataArr, size_t *index) {
    if (tree == NULL) return;

    fill_ordered(tree->left, dataArr, index);
    dataArr[(*index)++] = tree->data;
    fill_ordered(tree->right, dataArr, index);
}

static size_t count_nodes(node_t *tree) {
    if (tree == NULL) return 0;
    return 1 + count_nodes(tree->left) + count_nodes(tree->right);
}


int *sorted_data(node_t *tree) {
    if (tree == NULL) return NULL;

    size_t num_nodes = count_nodes(tree);
    int *sorted_data = malloc(num_nodes * sizeof(int));
    if (sorted_data == NULL) return NULL;

    size_t index = 0;
    fill_ordered(tree, sorted_data, &index);

    return sorted_data;
}