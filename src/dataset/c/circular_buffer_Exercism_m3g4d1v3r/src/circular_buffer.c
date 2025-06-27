#include "circular_buffer.h"

circular_buffer_t *new_circular_buffer(size_t capacity) {
    circular_buffer_t *ring_buffer;

    ring_buffer = malloc(sizeof(circular_buffer_t));
    if (ring_buffer == NULL) return (NULL);
    ring_buffer->array = malloc(sizeof(buffer_value_t) * capacity);
    if (ring_buffer->array == NULL) return (NULL);
    ring_buffer->full_buffer = false;
    ring_buffer->capacity = capacity;
    ring_buffer->read_idx = 0;
    ring_buffer->write_idx = 0;
    return (ring_buffer);
}

void delete_buffer(circular_buffer_t *buffer) {
    if (buffer == NULL) return;
    if (buffer->array != NULL) free(buffer->array);
    free(buffer);
}

int16_t read(circular_buffer_t *buffer, buffer_value_t *read_value) {
    if (buffer == NULL || read_value == NULL) return (EXIT_FAILURE);
    if (buffer->full_buffer == false && buffer->read_idx == buffer->write_idx) {
        errno = ENODATA;
        return (EXIT_FAILURE);
    }
    *read_value = buffer->array[buffer->read_idx];
    buffer->read_idx = (buffer->read_idx + 1) % buffer->capacity;
    buffer->full_buffer = false;
    return (EXIT_SUCCESS);
}

int16_t write(circular_buffer_t *buffer, buffer_value_t write_value) {
    if (buffer == NULL) return (EXIT_FAILURE);
    if (buffer->full_buffer == true) {
        errno = ENOBUFS;
        return (EXIT_FAILURE);
    }
    buffer->array[buffer->write_idx] = write_value;
    buffer->write_idx = (buffer->write_idx + 1) % buffer->capacity;
    if (buffer->write_idx == buffer->read_idx) buffer->full_buffer = true;
    return (EXIT_SUCCESS);
}

int16_t overwrite(circular_buffer_t *buffer, buffer_value_t write_value) {
    if (buffer == NULL) return (EXIT_FAILURE);
    buffer->array[buffer->write_idx] = write_value;
    buffer->write_idx = (buffer->write_idx + 1) % buffer->capacity;
    if (buffer->full_buffer == true)
        buffer->read_idx = (buffer->read_idx + 1) % buffer->capacity;
    else if (buffer->write_idx == buffer->read_idx)
        buffer->full_buffer = true;
    return (EXIT_SUCCESS);
}

int16_t clear_buffer(circular_buffer_t *buffer) {
    if (buffer == NULL) return (EXIT_FAILURE);
    buffer->full_buffer = false;
    buffer->read_idx = 0;
    buffer->write_idx = 0;
    return (EXIT_SUCCESS);
}
