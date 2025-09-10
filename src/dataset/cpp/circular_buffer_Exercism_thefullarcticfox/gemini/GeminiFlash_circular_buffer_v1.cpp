#include "circular_buffer.h"
#include <algorithm>
#include <stdexcept>

namespace circular_buffer {

circular_buffer::circular_buffer(size_t capacity) : capacity_(capacity), buffer_(new int[capacity]), head_(0), tail_(0), size_(0) {
    if (capacity == 0) {
        throw std::invalid_argument("Circular buffer capacity must be greater than zero.");
    }
}

circular_buffer::~circular_buffer() {
    delete[] buffer_;
}

circular_buffer::circular_buffer(const circular_buffer& other) : capacity_(other.capacity_), buffer_(new int[other.capacity_]), head_(other.head_), tail_(other.tail_), size_(other.size_) {
    std::copy(other.buffer_, other.buffer_ + other.capacity_, buffer_);
}

circular_buffer& circular_buffer::operator=(const circular_buffer& other) {
    if (this != &other) {
        if (capacity_ != other.capacity_) {
            delete[] buffer_;
            capacity_ = other.capacity_;
            buffer_ = new int[capacity_];
        }
        std::copy(other.buffer_, other.buffer_ + other.capacity_, buffer_);
        head_ = other.head_;
        tail_ = other.tail_;
        size_ = other.size_;
    }
    return *this;
}

int circular_buffer::front() const {
    if (empty()) {
        throw std::out_of_range("Circular buffer is empty.");
    }
    return buffer_[head_];
}

int circular_buffer::back() const {
    if (empty()) {
        throw std::out_of_range("Circular buffer is empty.");
    }
    return buffer_[(tail_ == 0 ? capacity_ : tail_) - 1];
}

int circular_buffer::dequeue() {
    if (empty()) {
        throw std::out_of_range("Circular buffer is empty.");
    }
    int value = buffer_[head_];
    head_ = (head_ + 1) % capacity_;
    --size_;
    return value;
}

void circular_buffer::enqueue(int value) {
    if (full()) {
        throw std::overflow_error("Circular buffer is full.");
    }
    buffer_[tail_] = value;
    tail_ = (tail_ + 1) % capacity_;
    ++size_;
}

void circular_buffer::clear() {
    head_ = 0;
    tail_ = 0;
    size_ = 0;
}

size_t circular_buffer::size() const {
    return size_;
}

size_t circular_buffer::capacity() const {
    return capacity_;
}

bool circular_buffer::empty() const {
    return size_ == 0;
}

bool circular_buffer::full() const {
    return size_ == capacity_;
}

}  // namespace circular_buffer