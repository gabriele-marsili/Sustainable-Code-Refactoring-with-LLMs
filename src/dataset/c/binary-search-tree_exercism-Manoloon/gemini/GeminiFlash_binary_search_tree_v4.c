#include "binary_search_tree.h"
#include <stdlib.h>

node_t *build_tree(int *tree_data, size_t tree_data_len) {
    if (tree_data == NULL || tree_data_len == 0) return NULL;

    node_t *root = NULL;
    node_t *current = NULL;
    node_t *new_node = NULL;

    for (size_t i = 0; i < tree_data_len; ++i) {
        int data = tree_data[i];
        if (root == NULL) {
            new_node = (node_t *)malloc(sizeof(node_t));
            if (new_node == NULL) return NULL;
            new_node->data = data;
            new_node->left = NULL;
            new_node->right = NULL;
            root = new_node;
            continue;
        }

        current = root;
        while (1) {
            if (data <= current->data) {
                if (current->left == NULL) {
                    new_node = (node_t *)malloc(sizeof(node_t));
                    if (new_node == NULL) return NULL;
                    new_node->data = data;
                    new_node->left = NULL;
                    new_node->right = NULL;
                    current->left = new_node;
                    break;
                } else {
                    current = current->left;
                }
            } else {
                if (current->right == NULL) {
                    new_node = (node_t *)malloc(sizeof(node_t));
                    if (new_node == NULL) return NULL;
                    new_node->data = data;
                    new_node->left = NULL;
                    new_node->right = NULL;
                    current->right = new_node;
                    break;
                } else {
                    current = current->right;
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

int *sorted_data(node_t *tree) {
    if (tree == NULL) return NULL;

    size_t num_nodes = 0;
    count_nodes_iterative(tree, &num_nodes);

    int *sorted_data = (int *)malloc(num_nodes * sizeof(int));
    if (sorted_data == NULL) return NULL;

    size_t index = 0;
    fill_ordered_iterative(tree, sorted_data, &index);

    return sorted_data;
}

void count_nodes_iterative(node_t *tree, size_t *count) {
    if (tree == NULL) return;

    struct StackNode {
        node_t *node;
        struct StackNode *next;
    };

    struct StackNode *stack = NULL;
    node_t *current = tree;

    while (current != NULL || stack != NULL) {
        while (current != NULL) {
            struct StackNode *newNode = (struct StackNode *)malloc(sizeof(struct StackNode));
            if (newNode == NULL) return; 
            newNode->node = current;
            newNode->next = stack;
            stack = newNode;
            current = current->left;
        }

        current = stack->node;
        stack = stack->next;
        (*count)++;
        current = current->right;
    }
    
    // Free the stack (important to avoid memory leaks)
    while (stack != NULL) {
        struct StackNode *temp = stack;
        stack = stack->next;
        free(temp);
    }
}

void fill_ordered_iterative(node_t *tree, int *dataArr, size_t *index) {
    if (tree == NULL) return;

    struct StackNode {
        node_t *node;
        struct StackNode *next;
    };

    struct StackNode *stack = NULL;
    node_t *current = tree;

    while (current != NULL || stack != NULL) {
        while (current != NULL) {
            struct StackNode *newNode = (struct StackNode *)malloc(sizeof(struct StackNode));
            if (newNode == NULL) return;
            newNode->node = current;
            newNode->next = stack;
            stack = newNode;
            current = current->left;
        }

        current = stack->node;
        stack = stack->next;
        dataArr[(*index)++] = current->data;
        current = current->right;
    }

    // Free the stack (important to avoid memory leaks)
    while (stack != NULL) {
        struct StackNode *temp = stack;
        stack = stack->next;
        free(temp);
    }
}

node_t* insert(node_t *root, int tree_data) {
    if (root == NULL) {
        node_t* new_node = (node_t*)malloc(sizeof(node_t));
        if (new_node == NULL) return NULL;

        new_node->data = tree_data;
        new_node->left = NULL;
        new_node->right = NULL;
        return new_node;
    }

    if (tree_data <= root->data) {
        root->left = insert(root->left, tree_data);
    } else {
        root->right = insert(root->right, tree_data);
    }
    return root;
}

size_t count_nodes(node_t *tree) {
    if (tree == NULL) return 0;
    return 1 + count_nodes(tree->left) + count_nodes(tree->right);
}

void fill_ordered(node_t *tree, int *dataArr, size_t *index) {
    if (tree == NULL) return;

    fill_ordered(tree->left, dataArr, index);
    dataArr[(*index)++] = tree->data;
    fill_ordered(tree->right, dataArr, index);
}