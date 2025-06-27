#ifndef CIRCULAR_BUFFER_H
#define CIRCULAR_BUFFER_H

#include <errno.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>

typedef int32_t buffer_value_t;

typedef struct {
    bool full_buffer;
    size_t capacity;
    size_t read_idx;
    size_t write_idx;
    buffer_value_t *array;
} circular_buffer_t;

// Allocate and de-allocate functions of the ring buffer
circular_buffer_t *new_circular_buffer(size_t capacity);
void delete_buffer(circular_buffer_t *buffer);

// Classic operations on the ring buffer
int16_t read(circular_buffer_t *buffer, buffer_value_t *read_value);
int16_t write(circular_buffer_t *buffer, buffer_value_t write_value);
int16_t overwrite(circular_buffer_t *buffer, buffer_value_t write_value);
int16_t clear_buffer(circular_buffer_t *buffer);

#endif
