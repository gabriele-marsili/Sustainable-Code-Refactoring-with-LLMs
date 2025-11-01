#include "binary_search_tree.h"
#include <stdlib.h>
#include <string.h>

node_t *build_tree(int *tree_data, size_t tree_data_len)
{
    if(tree_data == NULL || tree_data_len == 0) return NULL;

    node_t* root = NULL;
    
    for(size_t i = 0; i < tree_data_len; ++i)
    {
        root = insert(root, tree_data[i]);
    }
    return root;
}

void free_tree(node_t *tree)
{
    node_t *stack[1000];
    int top = -1;
    
    if(tree == NULL) return;
    
    stack[++top] = tree;
    
    while(top >= 0)
    {
        node_t *current = stack[top--];
        
        if(current->left) stack[++top] = current->left;
        if(current->right) stack[++top] = current->right;
        
        free(current);
    }
}

int *sorted_data(node_t *tree)
{
    if(tree == NULL) return NULL;

    size_t num_nodes = count_nodes(tree);
    int* sorted_array = malloc(num_nodes * sizeof(int));
    if(sorted_array == NULL) return NULL;
    
    size_t index = 0;
    fill_ordered(tree, sorted_array, &index);
    return sorted_array;
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
    
    node_t *current = root;
    node_t *parent = NULL;
    
    while(current != NULL)
    {
        parent = current;
        if(tree_data <= current->data)
            current = current->left;
        else
            current = current->right;
    }
    
    node_t* new_node = malloc(sizeof(node_t));
    if(new_node == NULL) return root;
    
    new_node->data = tree_data;
    new_node->left = NULL;
    new_node->right = NULL;
    
    if(tree_data <= parent->data)
        parent->left = new_node;
    else
        parent->right = new_node;
    
    return root;
}

size_t count_nodes(node_t *tree) 
{
    if(tree == NULL) return 0;
    
    size_t count = 0;
    node_t *stack[1000];
    int top = -1;
    
    stack[++top] = tree;
    
    while(top >= 0)
    {
        node_t *current = stack[top--];
        count++;
        
        if(current->right) stack[++top] = current->right;
        if(current->left) stack[++top] = current->left;
    }
    
    return count;
}

void fill_ordered(node_t *tree, int *dataArr, size_t *index)
{
    if(tree == NULL) return;
    
    node_t *stack[1000];
    int top = -1;
    node_t *current = tree;
    
    while(current != NULL || top >= 0)
    {
        while(current != NULL)
        {
            stack[++top] = current;
            current = current->left;
        }
        
        current = stack[top--];
        dataArr[(*index)++] = current->data;
        current = current->right;
    }
}