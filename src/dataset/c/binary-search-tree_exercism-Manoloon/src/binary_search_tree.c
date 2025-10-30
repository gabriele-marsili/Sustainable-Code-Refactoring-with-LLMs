#include "binary_search_tree.h"
#include <stdlib.h>

node_t *build_tree(int *tree_data, size_t tree_data_len)
{
    if(tree_data == NULL || tree_data_len == 0) return NULL;

    node_t* root = NULL;

    for(size_t i = 0; i < tree_data_len;++i)
    {
        root = insert(root,tree_data[i]);
    }
    return root;
}

void free_tree(node_t *tree)
{
    if(tree == NULL) return;
    
    free_tree(tree->left);
    free_tree(tree->right);
    free(tree);
}

int *sorted_data(node_t *tree)
{
    if(tree == NULL) return NULL;

    size_t num_nodes = count_nodes(tree);
    int* sorted_data = malloc(num_nodes * sizeof(int));
    if(sorted_data == NULL) return NULL;
    size_t index = 0;
    fill_ordered(tree,sorted_data,&index);
    return sorted_data;
}

node_t* insert(node_t *root, int tree_data)
{
    if(root == NULL)
    {
        node_t* new_node = malloc(sizeof(node_t));
        if(new_node == NULL) return NULL;

        new_node->data = tree_data;
        new_node->left = NULL;
        new_node->right = NULL;
        return new_node;
    }
    // insert left
    if(tree_data <= root->data)
    {
        root->left = insert(root->left,tree_data);
    }
    else
    {
        root->right = insert(root->right,tree_data);
    }
    return root;
}

// Count total nodes in tree
size_t count_nodes(node_t *tree) 
{
    if (tree == NULL) return 0;

    return 1 + count_nodes(tree->left) + count_nodes(tree->right);
}

void fill_ordered(node_t *tree, int *dataArr, size_t *index)
{
    if(tree == NULL) return;

    fill_ordered(tree->left, dataArr, index);
    dataArr[(*index)++] = tree->data;
    fill_ordered(tree->right, dataArr, index);
}
