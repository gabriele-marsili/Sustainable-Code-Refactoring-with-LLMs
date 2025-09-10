#include <iostream>
#include <memory>
#include <algorithm> // For std::swap

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
    } else {
      // Duplicate data: do nothing (or handle as needed)
      return node;
    }
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
  Node* find_min(Node* node) {
    Node* current = node;
    while (current && current->left != nullptr) {
      current = current->left.get();
    }
    return current;
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

  // Helper function for recursive in-order traversal
  void inorder_recursive(Node* node, std::vector<T>& result) const {
    if (node) {
      inorder_recursive(node->left.get(), result);
      result.push_back(node->data);
      inorder_recursive(node->right.get(), result);
    }
  }

  // Helper function for recursive pre-order traversal
  void preorder_recursive(Node* node, std::vector<T>& result) const {
    if (node) {
      result.push_back(node->data);
      preorder_recursive(node->left.get(), result);
      preorder_recursive(node->right.get(), result);
    }
  }

  // Helper function for recursive post-order traversal
  void postorder_recursive(Node* node, std::vector<T>& result) const {
    if (node) {
      postorder_recursive(node->left.get(), result);
      postorder_recursive(node->right.get(), result);
      result.push_back(node->data);
    }
  }

  // Helper function to recursively clear the tree
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
    clear();
  }

  // Insert a new node with the given data
  void insert(const T& data) {
    root.reset(insert_recursive(root.release(), data));
    node_count++;
  }

  // Search for a node with the given data
  bool search(const T& data) const {
    return search_recursive(root.get(), data) != nullptr;
  }

  // Delete a node with the given data
  void delete_node(const T& data) {
    root.reset(delete_recursive(root.release(), data));
  }

  // Get the minimum value in the tree
  T min() const {
    if (!root) {
      throw std::runtime_error("Tree is empty");
    }
    Node* min_node = find_min(root.get());
    return min_node->data;
  }

  // Get the maximum value in the tree (iterative)
  T max() const {
    if (!root) {
      throw std::runtime_error("Tree is empty");
    }
    Node* current = root.get();
    while (current && current->right != nullptr) {
      current = current->right.get();
    }
    return current->data;
  }

  // In-order traversal (left, root, right)
  std::vector<T> inorder() const {
    std::vector<T> result;
    inorder_recursive(root.get(), result);
    return result;
  }

  // Pre-order traversal (root, left, right)
  std::vector<T> preorder() const {
    std::vector<T> result;
    preorder_recursive(root.get(), result);
    return result;
  }

  // Post-order traversal (left, right, root)
  std::vector<T> postorder() const {
    std::vector<T> result;
    postorder_recursive(root.get(), result);
    return result;
  }

  // Clear the tree
  void clear() {
    clear_recursive(root.release());
    root = nullptr;
    node_count = 0;
  }

  // Get the number of nodes in the tree
  size_t size() const {
    return node_count;
  }

  // Check if the tree is empty
  bool empty() const {
    return node_count == 0;
  }

  // Swap the contents of two trees (efficiently)
  void swap(BinarySearchTree& other) {
    std::swap(root, other.root);
    std::swap(node_count, other.node_count);
  }
};

}  // namespace binary_search_tree