#include "circular_buffer.h"

circular_buffer_t *new_circular_buffer(size_t capacity) {
    if (capacity == 0) return NULL;
    
    circular_buffer_t *ring_buffer = malloc(sizeof(circular_buffer_t) + sizeof(buffer_value_t) * capacity);
    if (ring_buffer == NULL) return NULL;
    
    ring_buffer->array = (buffer_value_t*)(ring_buffer + 1);
    ring_buffer->capacity = capacity;
    ring_buffer->read_idx = 0;
    ring_buffer->write_idx = 0;
    ring_buffer->count = 0;
    
    return ring_buffer;
}

void delete_buffer(circular_buffer_t *buffer) {
    free(buffer);
}

int16_t read(circular_buffer_t *buffer, buffer_value_t *read_value) {
    if (!buffer || !read_value || buffer->count == 0) {
        if (buffer && read_value && buffer->count == 0) {
            errno = ENODATA;
        }
        return EXIT_FAILURE;
    }
    
    *read_value = buffer->array[buffer->read_idx];
    buffer->read_idx = (buffer->read_idx + 1) % buffer->capacity;
    --buffer->count;
    
    return EXIT_SUCCESS;
}

int16_t write(circular_buffer_t *buffer, buffer_value_t write_value) {
    if (!buffer || buffer->count == buffer->capacity) {
        if (buffer && buffer->count == buffer->capacity) {
            errno = ENOBUFS;
        }
        return EXIT_FAILURE;
    }
    
    buffer->array[buffer->write_idx] = write_value;
    buffer->write_idx = (buffer->write_idx + 1) % buffer->capacity;
    ++buffer->count;
    
    return EXIT_SUCCESS;
}

int16_t overwrite(circular_buffer_t *buffer, buffer_value_t write_value) {
    if (!buffer) return EXIT_FAILURE;
    
    buffer->array[buffer->write_idx] = write_value;
    buffer->write_idx = (buffer->write_idx + 1) % buffer->capacity;
    
    if (buffer->count == buffer->capacity) {
        buffer->read_idx = (buffer->read_idx + 1) % buffer->capacity;
    } else {
        ++buffer->count;
    }
    
    return EXIT_SUCCESS;
}

int16_t clear_buffer(circular_buffer_t *buffer) {
    if (!buffer) return EXIT_FAILURE;
    
    buffer->read_idx = 0;
    buffer->write_idx = 0;
    buffer->count = 0;
    
    return EXIT_SUCCESS;
}