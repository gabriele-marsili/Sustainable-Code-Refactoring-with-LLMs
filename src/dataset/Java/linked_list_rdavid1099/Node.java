package main.java;

public class Node<T> {
  private T data;
  private Node<T> nextNode, prevNode;

  public Node(T data) {
    this.data = data;
  }

  public void assignNext(Node<T> nextNode) {
    this.nextNode = nextNode;
  }

  public void assignPrev(Node<T> prevNode) {
    this.prevNode = prevNode;
  }

  public T getData() {
    return this.data;
  }

  public Node<T> getNext() {
    return this.nextNode;
  }

  public Node<T> getPrev() {
    return this.prevNode;
  }

  public boolean hasNext() {
    return this.nextNode == null;
  }

  public boolean hasPrev() {
    return this.prevNode == null;
  }
}
