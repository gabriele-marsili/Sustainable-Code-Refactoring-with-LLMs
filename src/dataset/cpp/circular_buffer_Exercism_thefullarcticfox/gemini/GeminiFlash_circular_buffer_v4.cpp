#include "circular_buffer.h"
#include <algorithm>
#include <stdexcept>

namespace circular_buffer {

template <typename T>
circular_buffer<T>::circular_buffer(size_t capacity) : capacity_(capacity), buffer_(new T[capacity_]), head_(0), tail_(0), size_(0) {
    if (capacity == 0) {
        throw std::invalid_argument("Capacity must be greater than zero.");
    }
}

template <typename T>
circular_buffer<T>::~circular_buffer() {
    delete[] buffer_;
}

template <typename T>
circular_buffer<T>::circular_buffer(const circular_buffer& other) : capacity_(other.capacity_), buffer_(new T[capacity_]), head_(other.head_), tail_(other.tail_), size_(other.size_) {
    std::copy(other.buffer_, other.buffer_ + capacity_, buffer_);
}

template <typename T>
circular_buffer<T>& circular_buffer<T>::operator=(const circular_buffer& other) {
    if (this != &other) {
        if (capacity_ != other.capacity_) {
            delete[] buffer_;
            capacity_ = other.capacity_;
            buffer_ = new T[capacity_];
        }
        head_ = other.head_;
        tail_ = other.tail_;
        size_ = other.size_;
        std::copy(other.buffer_, other.buffer_ + capacity_, buffer_);
    }
    return *this;
}

template <typename T>
circular_buffer<T>::circular_buffer(circular_buffer&& other) noexcept : capacity_(other.capacity_), buffer_(other.buffer_), head_(other.head_), tail_(other.tail_), size_(other.size_) {
    other.buffer_ = nullptr;
    other.size_ = 0;
    other.head_ = 0;
    other.tail_ = 0;
    other.capacity_ = 0;
}

template <typename T>
circular_buffer<T>& circular_buffer<T>::operator=(circular_buffer&& other) noexcept {
    if (this != &other) {
        delete[] buffer_;
        capacity_ = other.capacity_;
        buffer_ = other.buffer_;
        head_ = other.head_;
        tail_ = other.tail_;
        size_ = other.size_;

        other.buffer_ = nullptr;
        other.size_ = 0;
        other.head_ = 0;
        other.tail_ = 0;
        other.capacity_ = 0;
    }
    return *this;
}

template <typename T>
void circular_buffer<T>::push_back(const T& value) {
    if (is_full()) {
        throw std::runtime_error("Circular buffer is full.");
    }
    buffer_[tail_] = value;
    tail_ = (tail_ + 1) % capacity_;
    ++size_;
}

template <typename T>
void circular_buffer<T>::push_back(T&& value) {
    if (is_full()) {
        throw std::runtime_error("Circular buffer is full.");
    }
    buffer_[tail_] = std::move(value);
    tail_ = (tail_ + 1) % capacity_;
    ++size_;
}

template <typename T>
void circular_buffer<T>::pop_front() {
    if (is_empty()) {
        throw std::runtime_error("Circular buffer is empty.");
    }
    head_ = (head_ + 1) % capacity_;
    --size_;
}

template <typename T>
T& circular_buffer<T>::front() {
    if (is_empty()) {
        throw std::runtime_error("Circular buffer is empty.");
    }
    return buffer_[head_];
}

template <typename T>
const T& circular_buffer<T>::front() const {
    if (is_empty()) {
        throw std::runtime_error("Circular buffer is empty.");
    }
    return buffer_[head_];
}

template <typename T>
T& circular_buffer<T>::back() {
    if (is_empty()) {
        throw std::runtime_error("Circular buffer is empty.");
    }
    return buffer_[(tail_ + capacity_ - 1) % capacity_];
}

template <typename T>
const T& circular_buffer<T>::back() const {
    if (is_empty()) {
        throw std::runtime_error("Circular buffer is empty.");
    }
    return buffer_[(tail_ + capacity_ - 1) % capacity_];
}

template <typename T>
bool circular_buffer<T>::is_empty() const {
    return size_ == 0;
}

template <typename T>
bool circular_buffer<T>::is_full() const {
    return size_ == capacity_;
}

template <typename T>
size_t circular_buffer<T>::size() const {
    return size_;
}

template <typename T>
size_t circular_buffer<T>::capacity() const {
    return capacity_;
}

template <typename T>
void circular_buffer<T>::clear() {
    head_ = 0;
    tail_ = 0;
    size_ = 0;
}

}  // namespace circular_buffer