#include "binary_search_tree.h"
#include <stdlib.h>
#include <stdio.h> // For debugging, remove in production

node_t *build_tree(int *tree_data, size_t tree_data_len) {
    if (tree_data == NULL || tree_data_len == 0) return NULL;

    node_t *root = NULL;
    for (size_t i = 0; i < tree_data_len; ++i) {
        root = insert(root, tree_data[i]);
        if (root == NULL) {
            // Handle memory allocation failure during insertion
            // Free already allocated nodes to prevent memory leaks
            // This part is crucial for robustness
            for (size_t j = 0; j < i; ++j) {
                // A more efficient way to free the partially built tree would be ideal,
                // but without knowing the exact structure, this is a safe approach.
                // It assumes the insert function always adds to the bottom of the tree.
                // A proper tree traversal and deletion would be better in a real-world scenario.
                free_tree(root);
                return NULL;
            }
            return NULL;
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


int *sorted_data(node_t *tree) {
    if (tree == NULL) return NULL;

    size_t num_nodes = count_nodes(tree);
    if (num_nodes == 0) return NULL; // Handle empty tree case

    int *sorted_data = (int *)malloc(num_nodes * sizeof(int));
    if (sorted_data == NULL) return NULL;

    size_t index = 0;
    fill_ordered(tree, sorted_data, &index);

    return sorted_data;
}


node_t *insert(node_t *root, int tree_data) {
    if (root == NULL) {
        node_t *new_node = (node_t *)malloc(sizeof(node_t));
        if (new_node == NULL) return NULL;

        new_node->data = tree_data;
        new_node->left = NULL;
        new_node->right = NULL;
        return new_node;
    }

    if (tree_data <= root->data) {
        root->left = insert(root->left, tree_data);
        if (root->left == NULL) return NULL; // Propagate allocation failure
    } else {
        root->right = insert(root->right, tree_data);
        if (root->right == NULL) return NULL; // Propagate allocation failure
    }
    return root;
}


size_t count_nodes(node_t *tree) {
    if (tree == NULL) return 0;

    size_t count = 1;
    if (tree->left) count += count_nodes(tree->left);
    if (tree->right) count += count_nodes(tree->right);
    return count;
}


void fill_ordered(node_t *tree, int *dataArr, size_t *index) {
    if (tree == NULL) return;

    fill_ordered(tree->left, dataArr, index);
    dataArr[(*index)++] = tree->data;
    fill_ordered(tree->right, dataArr, index);
}