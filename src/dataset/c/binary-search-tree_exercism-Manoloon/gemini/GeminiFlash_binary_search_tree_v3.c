#include "binary_search_tree.h"
#include <stdlib.h>

node_t *build_tree(int *tree_data, size_t tree_data_len)
{
    if (tree_data == NULL || tree_data_len == 0)
        return NULL;

    node_t *root = NULL;

    for (size_t i = 0; i < tree_data_len; ++i)
    {
        node_t *new_node = malloc(sizeof(node_t));
        if (new_node == NULL)
        {
            free_tree(root);
            return NULL;
        }
        new_node->data = tree_data[i];
        new_node->left = NULL;
        new_node->right = NULL;

        if (root == NULL)
        {
            root = new_node;
        }
        else
        {
            node_t *current = root;
            while (1)
            {
                if (tree_data[i] <= current->data)
                {
                    if (current->left == NULL)
                    {
                        current->left = new_node;
                        break;
                    }
                    else
                    {
                        current = current->left;
                    }
                }
                else
                {
                    if (current->right == NULL)
                    {
                        current->right = new_node;
                        break;
                    }
                    else
                    {
                        current = current->right;
                    }
                }
            }
        }
    }
    return root;
}

void free_tree(node_t *tree)
{
    if (tree == NULL)
        return;

    free_tree(tree->left);
    free_tree(tree->right);
    free(tree);
}

int *sorted_data(node_t *tree)
{
    if (tree == NULL)
        return NULL;

    size_t num_nodes = count_nodes(tree);
    int *sorted_data = malloc(num_nodes * sizeof(int));
    if (sorted_data == NULL)
        return NULL;

    size_t index = 0;
    fill_ordered(tree, sorted_data, &index);
    return sorted_data;
}

node_t *insert(node_t *root, int tree_data)
{
    if (root == NULL)
    {
        node_t *new_node = malloc(sizeof(node_t));
        if (new_node == NULL)
            return NULL;

        new_node->data = tree_data;
        new_node->left = NULL;
        new_node->right = NULL;
        return new_node;
    }
    // insert left
    if (tree_data <= root->data)
    {
        root->left = insert(root->left, tree_data);
    }
    else
    {
        root->right = insert(root->right, tree_data);
    }
    return root;
}

size_t count_nodes(node_t *tree)
{
    if (tree == NULL)
        return 0;

    size_t count = 1;
    if (tree->left)
        count += count_nodes(tree->left);
    if (tree->right)
        count += count_nodes(tree->right);
    return count;
}

void fill_ordered(node_t *tree, int *dataArr, size_t *index)
{
    if (tree == NULL)
        return;

    fill_ordered(tree->left, dataArr, index);
    dataArr[(*index)++] = tree->data;
    fill_ordered(tree->right, dataArr, index);
}