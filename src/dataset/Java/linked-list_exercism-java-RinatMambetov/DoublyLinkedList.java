class DoublyLinkedList<T> {
    private Element<T> first;
    private Element<T> last;

    void push(T value) {
        Element<T> node = new Element<>(value, last, null);
        if (last == null) {
            first = node;
        } else {
            last.next = node;
        }
        last = node;
    }

    T pop() {
        if (last == null) {
            return null;
        }
        T result = last.value;
        last = last.prev;
        if (last == null) {
            first = null;
        } else {
            last.next = null;
        }
        return result;
    }

    void unshift(T value) {
        Element<T> node = new Element<>(value, null, first);
        if (first == null) {
            last = node;
        } else {
            first.prev = node;
        }
        first = node;
    }

    T shift() {
        if (first == null) {
            return null;
        }
        T result = first.value;
        first = first.next;
        if (first == null) {
            last = null;
        } else {
            first.prev = null;
        }
        return result;
    }

    private static final class Element<T> {
        final T value;
        Element<T> prev;
        Element<T> next;

        Element(T value, Element<T> prev, Element<T> next) {
            this.value = value;
            this.prev = prev;
            this.next = next;
        }
    }
}
