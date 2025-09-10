#include "binary_search_tree.h"
#include <algorithm>
#include <memory>
#include <stack>
#include <utility>

namespace binary_search_tree {

template <typename T>
class BinarySearchTree {
 public:
  BinarySearchTree() : root_(nullptr), size_(0) {}

  ~BinarySearchTree() {
    // Iterative post-order traversal for efficient deletion
    std::stack<Node*> stack;
    Node* current = root_;
    Node* lastVisited = nullptr;

    while (current != nullptr || !stack.empty()) {
      if (current != nullptr) {
        stack.push(current);
        current = current->left;
      } else {
        Node* peekNode = stack.top();
        if (peekNode->right != nullptr && lastVisited != peekNode->right) {
          current = peekNode->right;
        } else {
          stack.pop();
          delete peekNode;
          lastVisited = peekNode;
          current = nullptr;
        }
      }
    }
  }

  void insert(const T& value) {
    Node* newNode = new Node(value);
    if (root_ == nullptr) {
      root_ = newNode;
    } else {
      Node* current = root_;
      while (true) {
        if (value < current->data) {
          if (current->left == nullptr) {
            current->left = newNode;
            break;
          } else {
            current = current->left;
          }
        } else {
          if (current->right == nullptr) {
            current->right = newNode;
            break;
          } else {
            current = current->right;
          }
        }
      }
    }
    size_++;
  }

  bool contains(const T& value) const {
    Node* current = root_;
    while (current != nullptr) {
      if (value == current->data) {
        return true;
      } else if (value < current->data) {
        current = current->left;
      } else {
        current = current->right;
      }
    }
    return false;
  }

  bool remove(const T& value) {
    Node* parent = nullptr;
    Node* current = root_;

    // Find the node to be deleted and its parent
    while (current != nullptr && current->data != value) {
      parent = current;
      if (value < current->data) {
        current = current->left;
      } else {
        current = current->right;
      }
    }

    if (current == nullptr) {
      return false; // Value not found
    }

    // Case 1: Node to be deleted has no children (leaf node)
    if (current->left == nullptr && current->right == nullptr) {
      if (current != root_) {
        if (parent->left == current) {
          parent->left = nullptr;
        } else {
          parent->right = nullptr;
        }
      } else {
        root_ = nullptr;
      }
      delete current;
    }
    // Case 2: Node to be deleted has one child
    else if (current->left == nullptr) {
      if (current != root_) {
        if (parent->left == current) {
          parent->left = current->right;
        } else {
          parent->right = current->right;
        }
      } else {
        root_ = current->right;
      }
      delete current;
    } else if (current->right == nullptr) {
      if (current != root_) {
        if (parent->left == current) {
          parent->left = current->left;
        } else {
          parent->right = current->left;
        }
      } else {
        root_ = current->left;
      }
      delete current;
    }
    // Case 3: Node to be deleted has two children
    else {
      // Find the inorder successor (smallest node in the right subtree)
      Node* successorParent = current;
      Node* successor = current->right;
      while (successor->left != nullptr) {
        successorParent = successor;
        successor = successor->left;
      }

      // Copy the inorder successor's data to the node to be deleted
      current->data = successor->data;

      // Delete the inorder successor
      if (successorParent != current) {
        successorParent->left = successor->right;
      } else {
        successorParent->right = successor->right;
      }
      delete successor;
    }

    size_--;
    return true;
  }

  size_t size() const { return size_; }

 private:
  struct Node {
    T data;
    Node* left;
    Node* right;
    Node(const T& data) : data(data), left(nullptr), right(nullptr) {}
  };

  Node* root_;
  size_t size_;
};

}  // namespace binary_search_tree