#include "circular_buffer.h"
#include <algorithm>
#include <stdexcept>

namespace circular_buffer {

template <typename T>
CircularBuffer<T>::CircularBuffer(size_t capacity) : capacity_(capacity), buffer_(new T[capacity_]), head_(0), tail_(0), size_(0) {
  if (capacity == 0) {
    throw std::invalid_argument("Capacity must be greater than zero.");
  }
}

template <typename T>
CircularBuffer<T>::~CircularBuffer() {
  delete[] buffer_;
}

template <typename T>
CircularBuffer<T>::CircularBuffer(const CircularBuffer& other) : capacity_(other.capacity_), buffer_(new T[other.capacity_]), head_(other.head_), tail_(other.tail_), size_(other.size_) {
  std::copy(other.buffer_, other.buffer_ + other.capacity_, buffer_);
}

template <typename T>
CircularBuffer<T>& CircularBuffer<T>::operator=(const CircularBuffer& other) {
  if (this != &other) {
    if (capacity_ != other.capacity_) {
      delete[] buffer_;
      capacity_ = other.capacity_;
      buffer_ = new T[capacity_];
    }
    head_ = other.head_;
    tail_ = other.tail_;
    size_ = other.size_;
    std::copy(other.buffer_, other.buffer_ + other.capacity_, buffer_);
  }
  return *this;
}

template <typename T>
CircularBuffer<T>::CircularBuffer(CircularBuffer&& other) noexcept : capacity_(other.capacity_), buffer_(other.buffer_), head_(other.head_), tail_(other.tail_), size_(other.size_) {
  other.buffer_ = nullptr;
  other.size_ = 0;
  other.head_ = 0;
  other.tail_ = 0;
  other.capacity_ = 0;
}

template <typename T>
CircularBuffer<T>& CircularBuffer<T>::operator=(CircularBuffer&& other) noexcept {
  if (this != &other) {
    delete[] buffer_;
    buffer_ = other.buffer_;
    capacity_ = other.capacity_;
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
void CircularBuffer<T>::push_back(const T& value) {
  if (is_full()) {
    throw std::runtime_error("Circular buffer is full.");
  }
  buffer_[tail_] = value;
  tail_ = (tail_ + 1) % capacity_;
  ++size_;
}

template <typename T>
void CircularBuffer<T>::push_back(T&& value) {
  if (is_full()) {
    throw std::runtime_error("Circular buffer is full.");
  }
  buffer_[tail_] = std::move(value);
  tail_ = (tail_ + 1) % capacity_;
  ++size_;
}

template <typename T>
void CircularBuffer<T>::pop_front() {
  if (is_empty()) {
    throw std::runtime_error("Circular buffer is empty.");
  }
  head_ = (head_ + 1) % capacity_;
  --size_;
}

template <typename T>
T& CircularBuffer<T>::front() {
  if (is_empty()) {
    throw std::runtime_error("Circular buffer is empty.");
  }
  return buffer_[head_];
}

template <typename T>
const T& CircularBuffer<T>::front() const {
  if (is_empty()) {
    throw std::runtime_error("Circular buffer is empty.");
  }
  return buffer_[head_];
}

template <typename T>
T& CircularBuffer<T>::back() {
  if (is_empty()) {
    throw std::runtime_error("Circular buffer is empty.");
  }
  return buffer_[(tail_ + capacity_ - 1) % capacity_];
}

template <typename T>
const T& CircularBuffer<T>::back() const {
  if (is_empty()) {
    throw std::runtime_error("Circular buffer is empty.");
  }
  return buffer_[(tail_ + capacity_ - 1) % capacity_];
}

template <typename T>
bool CircularBuffer<T>::is_empty() const {
  return size_ == 0;
}

template <typename T>
bool CircularBuffer<T>::is_full() const {
  return size_ == capacity_;
}

template <typename T>
size_t CircularBuffer<T>::size() const {
  return size_;
}

template <typename T>
size_t CircularBuffer<T>::capacity() const {
  return capacity_;
}

template <typename T>
void CircularBuffer<T>::clear() {
  head_ = 0;
  tail_ = 0;
  size_ = 0;
}

}  // namespace circular_buffer