#include "binary_search_tree.h"
#include <algorithm>
#include <memory>
#include <stack>
#include <vector>

namespace binary_search_tree {

template <typename T>
class BinarySearchTree {
 private:
  struct Node {
    T data;
    std::unique_ptr<Node> left;
    std::unique_ptr<Node> right;

    Node(const T& data) : data(data), left(nullptr), right(nullptr) {}
  };

  std::unique_ptr<Node> root;
  size_t node_count;

  // Helper function for recursive insertion
  Node* insert_recursive(Node* node, const T& data) {
    if (!node) {
      return new Node(data);
    }

    if (data < node->data) {
      node->left.reset(insert_recursive(node->left.release(), data));
    } else if (data > node->data) {
      node->right.reset(insert_recursive(node->right.release(), data));
    }
    // else: data already exists, no insertion needed

    return node;
  }

  // Helper function for recursive search
  Node* search_recursive(Node* node, const T& data) const {
    if (!node) {
      return nullptr;
    }

    if (data == node->data) {
      return node;
    } else if (data < node->data) {
      return search_recursive(node->left.get(), data);
    } else {
      return search_recursive(node->right.get(), data);
    }
  }

  // Helper function to find the minimum value node in a subtree
  Node* find_min(Node* node) const {
    while (node && node->left) {
      node = node->left.get();
    }
    return node;
  }

  // Helper function for recursive deletion
  Node* delete_recursive(Node* node, const T& data) {
    if (!node) {
      return nullptr;
    }

    if (data < node->data) {
      node->left.reset(delete_recursive(node->left.release(), data));
    } else if (data > node->data) {
      node->right.reset(delete_recursive(node->right.release(), data));
    } else {
      // Node to be deleted found

      // Case 1: Node with no children or only one child
      if (!node->left) {
        Node* temp = node->right.release();
        delete node;
        node_count--;
        return temp;
      } else if (!node->right) {
        Node* temp = node->left.release();
        delete node;
        node_count--;
        return temp;
      }

      // Case 2: Node with two children
      // Find the inorder successor (smallest in the right subtree)
      Node* temp = find_min(node->right.get());

      // Copy the inorder successor's data to this node
      node->data = temp->data;

      // Delete the inorder successor
      node->right.reset(delete_recursive(node->right.release(), temp->data));
    }
    return node;
  }

  // Helper function for in-order traversal (iterative)
  std::vector<T> inorder_traversal_iterative() const {
    std::vector<T> result;
    std::stack<Node*> stack;
    Node* current = root.get();

    while (current || !stack.empty()) {
      while (current) {
        stack.push(current);
        current = current->left.get();
      }

      current = stack.top();
      stack.pop();
      result.push_back(current->data);

      current = current->right.get();
    }

    return result;
  }

  // Helper function to clear the tree (post-order traversal)
  void clear_recursive(Node* node) {
    if (node) {
      clear_recursive(node->left.release());
      clear_recursive(node->right.release());
      delete node;
    }
  }

 public:
  BinarySearchTree() : root(nullptr), node_count(0) {}

  ~BinarySearchTree() {
    clear_recursive(root.release());
  }

  // Copy constructor (deep copy)
  BinarySearchTree(const BinarySearchTree& other) : root(nullptr), node_count(0) {
    if (other.root) {
      std::vector<T> inorder = other.inorder();
      for (const auto& val : inorder) {
        insert(val);
      }
    }
  }

  // Move constructor
  BinarySearchTree(BinarySearchTree&& other) noexcept
      : root(std::move(other.root)), node_count(other.node_count) {
    other.node_count = 0;
  }

  // Copy assignment operator (deep copy)
  BinarySearchTree& operator=(const BinarySearchTree& other) {
    if (this != &other) {
      // Clear existing tree
      clear_recursive(root.release());
      node_count = 0;

      // Copy from other
      if (other.root) {
        std::vector<T> inorder = other.inorder();
        for (const auto& val : inorder) {
          insert(val);
        }
      }
    }
    return *this;
  }

  // Move assignment operator
  BinarySearchTree& operator=(BinarySearchTree&& other) noexcept {
    if (this != &other) {
      clear_recursive(root.release());
      node_count = 0;

      root = std::move(other.root);
      node_count = other.node_count;

      other.node_count = 0;
    }
    return *this;
  }

  void insert(const T& data) {
    if (!contains(data)) {
      root.reset(insert_recursive(root.release(), data));
      node_count++;
    }
  }

  bool contains(const T& data) const {
    return search_recursive(root.get(), data) != nullptr;
  }

  void remove(const T& data) {
    if (contains(data)) {
      root.reset(delete_recursive(root.release(), data));
    }
  }

  size_t size() const { return node_count; }

  bool empty() const { return node_count == 0; }

  std::vector<T> inorder() const {
    return inorder_traversal_iterative();
  }

  void clear() {
    clear_recursive(root.release());
    root = nullptr;
    node_count = 0;
  }
};

}  // namespace binary_search_tree