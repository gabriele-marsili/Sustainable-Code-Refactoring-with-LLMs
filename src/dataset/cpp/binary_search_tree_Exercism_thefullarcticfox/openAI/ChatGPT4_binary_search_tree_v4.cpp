#include "binary_search_tree.h"

namespace binary_search_tree {

// Optimized implementation of a binary search tree node
struct Node {
    int key;
    Node* left;
    Node* right;

    Node(int k) : key(k), left(nullptr), right(nullptr) {}
};

// Optimized binary search tree class
class BinarySearchTree {
private:
    Node* root;

    // Helper function for recursive insertion
    Node* insert(Node* node, int key) {
        if (!node) return new Node(key);
        if (key < node->key)
            node->left = insert(node->left, key);
        else if (key > node->key)
            node->right = insert(node->right, key);
        return node;
    }

    // Helper function for recursive search
    bool search(Node* node, int key) const {
        if (!node) return false;
        if (node->key == key) return true;
        return key < node->key ? search(node->left, key) : search(node->right, key);
    }

    // Helper function for recursive deletion
    Node* remove(Node* node, int key) {
        if (!node) return nullptr;
        if (key < node->key) {
            node->left = remove(node->left, key);
        } else if (key > node->key) {
            node->right = remove(node->right, key);
        } else {
            if (!node->left) {
                Node* temp = node->right;
                delete node;
                return temp;
            } else if (!node->right) {
                Node* temp = node->left;
                delete node;
                return temp;
            }
            Node* temp = findMin(node->right);
            node->key = temp->key;
            node->right = remove(node->right, temp->key);
        }
        return node;
    }

    // Helper function to find the minimum value node
    Node* findMin(Node* node) const {
        while (node && node->left) node = node->left;
        return node;
    }

    // Helper function for recursive cleanup
    void clear(Node* node) {
        if (!node) return;
        clear(node->left);
        clear(node->right);
        delete node;
    }

public:
    BinarySearchTree() : root(nullptr) {}

    ~BinarySearchTree() {
        clear(root);
    }

    void insert(int key) {
        root = insert(root, key);
    }

    bool search(int key) const {
        return search(root, key);
    }

    void remove(int key) {
        root = remove(root, key);
    }
};

}  // namespace binary_search_tree