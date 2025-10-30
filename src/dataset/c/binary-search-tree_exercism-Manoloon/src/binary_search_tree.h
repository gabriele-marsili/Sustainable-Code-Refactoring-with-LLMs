#ifndef BINARY_SEARCH_TREE_H
#define BINARY_SEARCH_TREE_H
#include <stddef.h>

typedef struct node node_t;

struct node {
   node_t *right;
   node_t *left;
   int data;
};

node_t *build_tree(int *tree_data, size_t tree_data_len);
void free_tree(node_t *tree);
int *sorted_data(node_t *tree);

// Helper functions
node_t* insert(node_t* root, int tree_data);
size_t count_nodes(node_t *tree);
void fill_ordered(node_t* tree, int* dataArr, size_t* index);
#endif
