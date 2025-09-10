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

int circular_buffer::front() const {
  if (empty()) {
    throw std::out_of_range("Cannot access front of an empty circular buffer.");
  }
  return buffer_[head_];
}

int circular_buffer::back() const {
  if (empty()) {
    throw std::out_of_range("Cannot access back of an empty circular buffer.");
  }
  return buffer_[(tail_ == 0 ? capacity_ : tail_) - 1];
}

void circular_buffer::push_back(int value) {
  if (full()) {
    throw std::overflow_error("Cannot push_back to a full circular buffer.");
  }
  buffer_[tail_] = value;
  tail_ = (tail_ + 1) % capacity_;
  ++size_;
}

void circular_buffer::pop_front() {
  if (empty()) {
    throw std::underflow_error("Cannot pop_front from an empty circular buffer.");
  }
  head_ = (head_ + 1) % capacity_;
  --size_;
}

bool circular_buffer::empty() const {
  return size_ == 0;
}

bool circular_buffer::full() const {
  return size_ == capacity_;
}

size_t circular_buffer::size() const {
  return size_;
}

void circular_buffer::clear() {
  head_ = 0;
  tail_ = 0;
  size_ = 0;
}

void circular_buffer::overwrite(int value) {
    if (full()) {
        head_ = (head_ + 1) % capacity_;
    } else {
        ++size_;
    }
    buffer_[tail_] = value;
    tail_ = (tail_ + 1) % capacity_;
}

}  // namespace circular_buffer