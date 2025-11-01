#include "binary_search_tree.h"
#include <stdlib.h>

node_t *build_tree(int *tree_data, size_t tree_data_len)
{
    if(tree_data == NULL || tree_data_len == 0) return NULL;

    node_t* root = NULL;

    for(size_t i = 0; i < tree_data_len; ++i)
    {
        node_t** current = &root;
        while (*current != NULL)
        {
            current = (tree_data[i] <= (*current)->data) ? &(*current)->left : &(*current)->right;
        }
        *current = malloc(sizeof(node_t));
        if (*current == NULL) return NULL;
        (*current)->data = tree_data[i];
        (*current)->left = NULL;
        (*current)->right = NULL;
    }
    return root;
}

void free_tree(node_t *tree)
{
    if(tree == NULL) return;

    node_t *stack[1024];
    size_t stack_size = 0;
    stack[stack_size++] = tree;

    while (stack_size > 0)
    {
        node_t *node = stack[--stack_size];
        if (node->left) stack[stack_size++] = node->left;
        if (node->right) stack[stack_size++] = node->right;
        free(node);
    }
}

int *sorted_data(node_t *tree)
{
    if(tree == NULL) return NULL;

    size_t num_nodes = 0;
    node_t *stack[1024];
    size_t stack_size = 0;
    node_t *current = tree;

    while (current || stack_size > 0)
    {
        while (current)
        {
            stack[stack_size++] = current;
            current = current->left;
        }
        current = stack[--stack_size];
        ++num_nodes;
        current = current->right;
    }

    int* sorted_data = malloc(num_nodes * sizeof(int));
    if(sorted_data == NULL) return NULL;

    size_t index = 0;
    current = tree;
    stack_size = 0;

    while (current || stack_size > 0)
    {
        while (current)
        {
            stack[stack_size++] = current;
            current = current->left;
        }
        current = stack[--stack_size];
        sorted_data[index++] = current->data;
        current = current->right;
    }

    return sorted_data;
}

node_t* insert(node_t *root, int tree_data)
{
    node_t** current = &root;
    while (*current != NULL)
    {
        current = (tree_data <= (*current)->data) ? &(*current)->left : &(*current)->right;
    }
    *current = malloc(sizeof(node_t));
    if (*current == NULL) return NULL;

    (*current)->data = tree_data;
    (*current)->left = NULL;
    (*current)->right = NULL;
    return root;
}