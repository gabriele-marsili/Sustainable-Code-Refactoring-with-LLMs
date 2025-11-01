#include "binary_search_tree.h"
#include <stdlib.h>
#include <string.h>

node_t *build_tree(int *tree_data, size_t tree_data_len)
{
    if(tree_data == NULL || tree_data_len == 0) return NULL;

    node_t* root = NULL;
    node_t** stack = malloc(tree_data_len * sizeof(node_t*));
    if(stack == NULL) return NULL;
    
    for(size_t i = 0; i < tree_data_len; ++i)
    {
        node_t* new_node = malloc(sizeof(node_t));
        if(new_node == NULL) {
            free(stack);
            free_tree(root);
            return NULL;
        }
        
        new_node->data = tree_data[i];
        new_node->left = NULL;
        new_node->right = NULL;
        
        if(root == NULL) {
            root = new_node;
            continue;
        }
        
        node_t* current = root;
        while(1) {
            if(tree_data[i] <= current->data) {
                if(current->left == NULL) {
                    current->left = new_node;
                    break;
                }
                current = current->left;
            } else {
                if(current->right == NULL) {
                    current->right = new_node;
                    break;
                }
                current = current->right;
            }
        }
    }
    
    free(stack);
    return root;
}

void free_tree(node_t *tree)
{
    if(tree == NULL) return;
    
    node_t** stack = malloc(1000 * sizeof(node_t*));
    if(stack == NULL) {
        free_tree(tree->left);
        free_tree(tree->right);
        free(tree);
        return;
    }
    
    int top = 0;
    stack[top++] = tree;
    
    while(top > 0) {
        node_t* current = stack[--top];
        
        if(current->left) {
            if(top >= 999) {
                free(stack);
                free_tree(current->left);
                free_tree(current->right);
                free(current);
                return;
            }
            stack[top++] = current->left;
        }
        if(current->right) {
            if(top >= 999) {
                free(stack);
                free_tree(current->left);
                free_tree(current->right);
                free(current);
                return;
            }
            stack[top++] = current->right;
        }
        
        free(current);
    }
    
    free(stack);
}

int *sorted_data(node_t *tree)
{
    if(tree == NULL) return NULL;

    size_t num_nodes = count_nodes(tree);
    int* sorted_array = malloc(num_nodes * sizeof(int));
    if(sorted_array == NULL) return NULL;
    
    node_t** stack = malloc(num_nodes * sizeof(node_t*));
    if(stack == NULL) {
        free(sorted_array);
        return NULL;
    }
    
    int top = 0;
    size_t index = 0;
    node_t* current = tree;
    
    while(current != NULL || top > 0) {
        while(current != NULL) {
            stack[top++] = current;
            current = current->left;
        }
        
        current = stack[--top];
        sorted_array[index++] = current->data;
        current = current->right;
    }
    
    free(stack);
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
    
    node_t* current = root;
    while(1) {
        if(tree_data <= current->data) {
            if(current->left == NULL) {
                current->left = malloc(sizeof(node_t));
                if(current->left == NULL) return root;
                current->left->data = tree_data;
                current->left->left = NULL;
                current->left->right = NULL;
                break;
            }
            current = current->left;
        } else {
            if(current->right == NULL) {
                current->right = malloc(sizeof(node_t));
                if(current->right == NULL) return root;
                current->right->data = tree_data;
                current->right->left = NULL;
                current->right->right = NULL;
                break;
            }
            current = current->right;
        }
    }
    
    return root;
}

size_t count_nodes(node_t *tree) 
{
    if (tree == NULL) return 0;

    size_t count = 0;
    node_t** stack = malloc(1000 * sizeof(node_t*));
    if(stack == NULL) {
        return 1 + count_nodes(tree->left) + count_nodes(tree->right);
    }
    
    int top = 0;
    stack[top++] = tree;
    
    while(top > 0) {
        node_t* current = stack[--top];
        count++;
        
        if(current->right && top < 999) {
            stack[top++] = current->right;
        }
        if(current->left && top < 999) {
            stack[top++] = current->left;
        }
        
        if(top >= 999) {
            free(stack);
            return count + count_nodes(current->left) + count_nodes(current->right);
        }
    }
    
    free(stack);
    return count;
}

void fill_ordered(node_t *tree, int *dataArr, size_t *index)
{
    if(tree == NULL) return;

    node_t** stack = malloc(1000 * sizeof(node_t*));
    if(stack == NULL) {
        fill_ordered(tree->left, dataArr, index);
        dataArr[(*index)++] = tree->data;
        fill_ordered(tree->right, dataArr, index);
        return;
    }
    
    int top = 0;
    node_t* current = tree;
    
    while(current != NULL || top > 0) {
        while(current != NULL) {
            if(top >= 999) {
                free(stack);
                fill_ordered(current, dataArr, index);
                return;
            }
            stack[top++] = current;
            current = current->left;
        }
        
        current = stack[--top];
        dataArr[(*index)++] = current->data;
        current = current->right;
    }
    
    free(stack);
}