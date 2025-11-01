#include "circular_buffer.h"
#include <stdlib.h>
#include <errno.h>

circular_buffer_t *new_circular_buffer(size_t capacity)
{
    if (capacity < 1) return NULL;

    circular_buffer_t* new_buffer = malloc(sizeof(circular_buffer_t));
    if (!new_buffer) return NULL;

    new_buffer->values = calloc(capacity, sizeof(buffer_value_t));
    if (!new_buffer->values)
    {
        free(new_buffer);
        return NULL;
    }

    new_buffer->capacity = capacity;
    new_buffer->head = 0;
    new_buffer->tail = 0;
    new_buffer->num_items = 0;
    return new_buffer;
}

void delete_buffer(circular_buffer_t *buffer)
{
    if (buffer)
    {
        free(buffer->values);
        free(buffer);
    }
}

void clear_buffer(circular_buffer_t *buffer)
{
    if (!buffer) return;

    buffer->head = 0;
    buffer->tail = 0;
    buffer->num_items = 0;
}

int16_t read(circular_buffer_t *buffer, buffer_value_t* OutValue)
{
    if (!buffer || !OutValue || buffer->num_items == 0)
    {
        errno = ENODATA;
        return EXIT_FAILURE;
    }

    *OutValue = buffer->values[buffer->head];
    buffer->head = (buffer->head + 1) % buffer->capacity;
    buffer->num_items--;
    return EXIT_SUCCESS;
}

int16_t write(circular_buffer_t *buffer, buffer_value_t value)
{
    if (!buffer)
    {
        return EXIT_FAILURE;
    }

    if (buffer->num_items == buffer->capacity)
    {
        errno = ENOBUFS;
        return EXIT_FAILURE;
    }

    buffer->values[buffer->tail] = value;
    buffer->tail = (buffer->tail + 1) % buffer->capacity;
    buffer->num_items++;
    return EXIT_SUCCESS;
}

int16_t overwrite(circular_buffer_t *buffer, buffer_value_t value)
{
    if (!buffer)
    {
        return EXIT_FAILURE;
    }

    if (buffer->num_items == buffer->capacity)
    {
        buffer->values[buffer->head] = value;
        buffer->head = (buffer->head + 1) % buffer->capacity;
    }
    else
    {
        return write(buffer, value);
    }

    return EXIT_SUCCESS;
}