import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

class BinarySearchTree<T extends Comparable<T>> {

    private Node<T> root;

    void insert(T value) {
        root = insertRecursive(root, value);
    }

    private Node<T> insertRecursive(Node<T> current, T value) {
        if (current == null) {
            return new Node<>(value);
        }

        if (value.compareTo(current.data) < 0) {
            current.left = insertRecursive(current.left, value);
        } else if (value.compareTo(current.data) > 0) {
            current.right = insertRecursive(current.right, value);
        } else {
            // Value already exists, no insertion needed
            return current;
        }

        return current;
    }

    List<T> getAsSortedList() {
        List<T> list = new ArrayList<>();
        inorderTraversal(root, list);
        return list;
    }

    private void inorderTraversal(Node<T> node, List<T> list) {
        if (node != null) {
            inorderTraversal(node.left, list);
            list.add(node.data);
            inorderTraversal(node.right, list);
        }
    }

    List<T> getAsLevelOrderList() {
        List<T> list = new ArrayList<>();
        if (root == null) {
            return list;
        }

        Queue<Node<T>> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            Node<T> node = queue.poll();
            list.add(node.data);

            if (node.left != null) {
                queue.offer(node.left);
            }
            if (node.right != null) {
                queue.offer(node.right);
            }
        }

        return list;
    }

    Node<T> getRoot() {
        return root;
    }

    static class Node<T> {
        T data;
        Node<T> left;
        Node<T> right;

        Node(T data) {
            this.data = data;
        }

        Node<T> getLeft() {
            return left;
        }

        Node<T> getRight() {
            return right;
        }

        T getData() {
            return data;
        }
    }
}