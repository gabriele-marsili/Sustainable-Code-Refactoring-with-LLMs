#include <iostream>
#include <memory>
#include <algorithm>

namespace binary_search_tree {

template <typename T>
class BinarySearchTree {
 private:
  struct Node {
    T data;
    Node* left;
    Node* right;

    Node(const T& data) : data(data), left(nullptr), right(nullptr) {}
  };

  Node* root;

  // Helper function for recursive insertion
  Node* insert_recursive(Node* node, const T& data) {
    if (node == nullptr) {
      return new Node(data);
    }

    if (data < node->data) {
      node->left = insert_recursive(node->left, data);
    } else if (data > node->data) {
      node->right = insert_recursive(node->right, data);
    } else {
      // Duplicate values are not allowed, so we don't insert.
      return node;
    }
    return node;
  }

  // Helper function for recursive search
  Node* search_recursive(Node* node, const T& data) const {
    if (node == nullptr || node->data == data) {
      return node;
    }

    if (data < node->data) {
      return search_recursive(node->left, data);
    } else {
      return search_recursive(node->right, data);
    }
  }

  // Helper function to find the minimum value node in a subtree
  Node* find_min(Node* node) const {
    while (node && node->left != nullptr) {
      node = node->left;
    }
    return node;
  }

  // Helper function for recursive deletion
  Node* delete_recursive(Node* node, const T& data) {
    if (node == nullptr) {
      return nullptr;
    }

    if (data < node->data) {
      node->left = delete_recursive(node->left, data);
    } else if (data > node->data) {
      node->right = delete_recursive(node->right, data);
    } else {
      // Node to be deleted found

      // Case 1: Node with only one child or no child
      if (node->left == nullptr) {
        Node* temp = node->right;
        delete node;
        return temp;
      } else if (node->right == nullptr) {
        Node* temp = node->left;
        delete node;
        return temp;
      }

      // Case 2: Node with two children
      // Get the inorder successor (smallest in the right subtree)
      Node* temp = find_min(node->right);

      // Copy the inorder successor's data to this node
      node->data = temp->data;

      // Delete the inorder successor
      node->right = delete_recursive(node->right, temp->data);
    }
    return node;
  }

  // Helper function for recursive in-order traversal
  void inorder_recursive(Node* node, std::vector<T>& result) const {
    if (node != nullptr) {
      inorder_recursive(node->left, result);
      result.push_back(node->data);
      inorder_recursive(node->right, result);
    }
  }

  // Helper function to free the memory occupied by the tree
  void destroy_tree(Node* node) {
    if (node != nullptr) {
      destroy_tree(node->left);
      destroy_tree(node->right);
      delete node;
    }
  }

 public:
  BinarySearchTree() : root(nullptr) {}

  ~BinarySearchTree() {
    destroy_tree(root);
  }

  void insert(const T& data) {
    root = insert_recursive(root, data);
  }

  bool search(const T& data) const {
    return search_recursive(root, data) != nullptr;
  }

  void remove(const T& data) {
    root = delete_recursive(root, data);
  }

  std::vector<T> inorder() const {
    std::vector<T> result;
    inorder_recursive(root, result);
    return result;
  }

  // Optional: Add a function to find the height of the tree
  int height() const {
    return height_recursive(root);
  }

 private:
  int height_recursive(Node* node) const {
    if (node == nullptr) {
      return 0;
    } else {
      return 1 + std::max(height_recursive(node->left), height_recursive(node->right));
    }
  }
};

}  // namespace binary_search_tree