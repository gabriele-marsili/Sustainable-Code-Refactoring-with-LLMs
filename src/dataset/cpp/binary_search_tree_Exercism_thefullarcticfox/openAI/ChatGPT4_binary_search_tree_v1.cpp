#include "binary_search_tree.h"

namespace binary_search_tree {

struct Node {
    int value;
    Node* left;
    Node* right;

    Node(int val) : value(val), left(nullptr), right(nullptr) {}
};

class BinarySearchTree {
private:
    Node* root;

    void deleteTree(Node* node) {
        if (node) {
            deleteTree(node->left);
            deleteTree(node->right);
            delete node;
        }
    }

    Node* insert(Node* node, int value) {
        if (!node) return new Node(value);
        if (value < node->value)
            node->left = insert(node->left, value);
        else if (value > node->value)
            node->right = insert(node->right, value);
        return node;
    }

    Node* findMin(Node* node) const {
        while (node && node->left) node = node->left;
        return node;
    }

    Node* remove(Node* node, int value) {
        if (!node) return nullptr;
        if (value < node->value)
            node->left = remove(node->left, value);
        else if (value > node->value)
            node->right = remove(node->right, value);
        else {
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
            node->value = temp->value;
            node->right = remove(node->right, temp->value);
        }
        return node;
    }

    bool search(Node* node, int value) const {
        if (!node) return false;
        if (value == node->value) return true;
        if (value < node->value)
            return search(node->left, value);
        return search(node->right, value);
    }

public:
    BinarySearchTree() : root(nullptr) {}

    ~BinarySearchTree() {
        deleteTree(root);
    }

    void insert(int value) {
        root = insert(root, value);
    }

    void remove(int value) {
        root = remove(root, value);
    }

    bool search(int value) const {
        return search(root, value);
    }
};

}  // namespace binary_search_tree