#include "binary_search_tree.h"

namespace binary_search_tree {

template <typename T>
class BinarySearchTree {
private:
    struct Node {
        T data;
        Node* left;
        Node* right;
        Node(const T& value) : data(value), left(nullptr), right(nullptr) {}
    };

    Node* root;

    void deleteTree(Node* node) {
        if (node) {
            deleteTree(node->left);
            deleteTree(node->right);
            delete node;
        }
    }

    Node* insert(Node* node, const T& value) {
        if (!node) return new Node(value);
        if (value < node->data)
            node->left = insert(node->left, value);
        else if (value > node->data)
            node->right = insert(node->right, value);
        return node;
    }

    Node* findMin(Node* node) const {
        while (node && node->left) node = node->left;
        return node;
    }

    Node* remove(Node* node, const T& value) {
        if (!node) return nullptr;
        if (value < node->data)
            node->left = remove(node->left, value);
        else if (value > node->data)
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
            node->data = temp->data;
            node->right = remove(node->right, temp->data);
        }
        return node;
    }

    bool search(Node* node, const T& value) const {
        if (!node) return false;
        if (value == node->data) return true;
        if (value < node->data)
            return search(node->left, value);
        return search(node->right, value);
    }

    void inOrderTraversal(Node* node, std::vector<T>& result) const {
        if (node) {
            inOrderTraversal(node->left, result);
            result.push_back(node->data);
            inOrderTraversal(node->right, result);
        }
    }

public:
    BinarySearchTree() : root(nullptr) {}

    ~BinarySearchTree() {
        deleteTree(root);
    }

    void insert(const T& value) {
        root = insert(root, value);
    }

    void remove(const T& value) {
        root = remove(root, value);
    }

    bool search(const T& value) const {
        return search(root, value);
    }

    std::vector<T> inOrderTraversal() const {
        std::vector<T> result;
        inOrderTraversal(root, result);
        return result;
    }
};

}  // namespace binary_search_tree