#include <vector>
#include <atomic>
#include <mutex>

namespace circular_buffer {

template <typename T>
class CircularBuffer {
public:
    explicit CircularBuffer(size_t capacity)
        : buffer_(capacity), capacity_(capacity), head_(0), tail_(0), size_(0) {}

    bool push(const T& item) {
        std::lock_guard<std::mutex> lock(mutex_);
        if (size_ == capacity_) return false; // Buffer is full
        buffer_[head_] = item;
        head_ = (head_ + 1) % capacity_;
        ++size_;
        return true;
    }

    bool pop(T& item) {
        std::lock_guard<std::mutex> lock(mutex_);
        if (size_ == 0) return false; // Buffer is empty
        item = buffer_[tail_];
        tail_ = (tail_ + 1) % capacity_;
        --size_;
        return true;
    }

    size_t size() const {
        return size_.load();
    }

    size_t capacity() const {
        return capacity_;
    }

    bool empty() const {
        return size_.load() == 0;
    }

    bool full() const {
        return size_.load() == capacity_;
    }

private:
    std::vector<T> buffer_;
    const size_t capacity_;
    size_t head_;
    size_t tail_;
    std::atomic<size_t> size_;
    mutable std::mutex mutex_;
};

}  // namespace circular_buffer