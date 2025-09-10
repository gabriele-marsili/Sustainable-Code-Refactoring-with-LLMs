#include <vector>
#include <stdexcept>

namespace circular_buffer {

template <typename T>
class CircularBuffer {
public:
    explicit CircularBuffer(size_t capacity)
        : buffer_(capacity), head_(0), tail_(0), size_(0), capacity_(capacity) {}

    void push(const T& item) {
        buffer_[tail_] = item;
        if (size_ == capacity_) {
            head_ = (head_ + 1) % capacity_;
        } else {
            ++size_;
        }
        tail_ = (tail_ + 1) % capacity_;
    }

    T pop() {
        if (empty()) {
            throw std::runtime_error("Buffer is empty");
        }
        T item = buffer_[head_];
        head_ = (head_ + 1) % capacity_;
        --size_;
        return item;
    }

    T peek() const {
        if (empty()) {
            throw std::runtime_error("Buffer is empty");
        }
        return buffer_[head_];
    }

    bool empty() const noexcept {
        return size_ == 0;
    }

    bool full() const noexcept {
        return size_ == capacity_;
    }

    size_t size() const noexcept {
        return size_;
    }

    size_t capacity() const noexcept {
        return capacity_;
    }

private:
    std::vector<T> buffer_;
    size_t head_;
    size_t tail_;
    size_t size_;
    size_t capacity_;
};

}  // namespace circular_buffer