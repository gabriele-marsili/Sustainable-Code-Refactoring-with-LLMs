import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

class BinarySearchTree<T extends Comparable<T>> {
    private Node<T> root;

    void insert(T value) {
        if (value == null) return;
        root = insertRec(root, value);
    }

    private Node<T> insertRec(Node<T> node, T value) {
        if (node == null) return new Node<>(value);
        if (value.compareTo(node.data) < 0) {
            node.left = insertRec(node.left, value);
        } else if (value.compareTo(node.data) > 0) {
            node.right = insertRec(node.right, value);
        }
        return node;
    }

    List<T> getAsSortedList() {
        List<T> sortedList = new ArrayList<>();
        inOrderTraversal(root, sortedList);
        return sortedList;
    }

    private void inOrderTraversal(Node<T> node, List<T> list) {
        if (node == null) return;
        inOrderTraversal(node.left, list);
        list.add(node.data);
        inOrderTraversal(node.right, list);
    }

    List<T> getAsLevelOrderList() {
        List<T> levelOrderList = new ArrayList<>();
        if (root == null) return levelOrderList;
        Queue<Node<T>> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            Node<T> current = queue.poll();
            levelOrderList.add(current.data);
            if (current.left != null) queue.add(current.left);
            if (current.right != null) queue.add(current.right);
        }
        return levelOrderList;
    }

    Node<T> getRoot() {
        return root;
    }

    static class Node<T> {
        private T data;
        private Node<T> left;
        private Node<T> right;

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