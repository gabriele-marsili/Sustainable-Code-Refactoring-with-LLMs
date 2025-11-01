#include "binary_search_tree.h"
#include <stdlib.h>

node_t *build_tree(int *tree_data, size_t tree_data_len)
{
    if (!tree_data || tree_data_len == 0) return NULL;

    node_t* root = NULL;

    for (size_t i = 0; i < tree_data_len; ++i)
    {
        node_t** current = &root;
        while (*current)
        {
            current = (tree_data[i] <= (*current)->data) ? &(*current)->left : &(*current)->right;
        }
        *current = malloc(sizeof(node_t));
        if (!*current) return NULL;
        (*current)->data = tree_data[i];
        (*current)->left = NULL;
        (*current)->right = NULL;
    }
    return root;
}

void free_tree(node_t *tree)
{
    if (!tree) return;

    node_t *stack[1024];
    size_t top = 0;
    stack[top++] = tree;

    while (top > 0)
    {
        node_t *node = stack[--top];
        if (node->left) stack[top++] = node->left;
        if (node->right) stack[top++] = node->right;
        free(node);
    }
}

int *sorted_data(node_t *tree)
{
    if (!tree) return NULL;

    size_t num_nodes = 0;
    node_t *stack[1024];
    size_t top = 0;
    node_t *current = tree;

    while (current || top > 0)
    {
        while (current)
        {
            stack[top++] = current;
            current = current->left;
        }
        current = stack[--top];
        ++num_nodes;
        current = current->right;
    }

    int *sorted_data = malloc(num_nodes * sizeof(int));
    if (!sorted_data) return NULL;

    size_t index = 0;
    current = tree;
    top = 0;

    while (current || top > 0)
    {
        while (current)
        {
            stack[top++] = current;
            current = current->left;
        }
        current = stack[--top];
        sorted_data[index++] = current->data;
        current = current->right;
    }

    return sorted_data;
}

node_t* insert(node_t *root, int tree_data)
{
    node_t **current = &root;

    while (*current)
    {
        current = (tree_data <= (*current)->data) ? &(*current)->left : &(*current)->right;
    }

    *current = malloc(sizeof(node_t));
    if (!*current) return NULL;

    (*current)->data = tree_data;
    (*current)->left = NULL;
    (*current)->right = NULL;

    return root;
}