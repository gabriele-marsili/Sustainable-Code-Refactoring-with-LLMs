#include "binary_search_tree.h"
#include <stdlib.h>

#define MAX_SIZE 10

node_t *build_tree(int elements[], int n_elements) {
    if (n_elements == 0) return NULL;
    
    struct node_t *root = NULL;
    struct node_t **tree_p;
    
    for(int e = 0; e < n_elements; e++) {
        tree_p = &root;
        while(*tree_p) {
            tree_p = ((*tree_p)->data < elements[e]) ? 
                     &(*tree_p)->right : &(*tree_p)->left;
        }
        *tree_p = malloc(sizeof(struct node_t));
        (*tree_p)->left = NULL;
        (*tree_p)->right = NULL;
        (*tree_p)->data = elements[e];
    }
    return root;
}

static void inorder_traversal(struct node_t *node, int *result, int *index) {
    if (node == NULL) return;
    
    inorder_traversal(node->left, result, index);
    result[(*index)++] = node->data;
    inorder_traversal(node->right, result, index);
}

int *sorted_data(struct node_t *tree) {
    if (tree == NULL) return NULL;
    
    int *result = malloc(sizeof(int) * MAX_SIZE);
    int index = 0;
    
    inorder_traversal(tree, result, &index);
    
    return result;
}