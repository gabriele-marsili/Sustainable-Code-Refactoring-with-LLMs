#include "circular_buffer.h"
#include <stdlib.h>
#include <errno.h>
#include <stdio.h>

circular_buffer_t *new_circular_buffer(size_t capacity)
{
    if(capacity < 1) return NULL;
    circular_buffer_t* new_buffer = malloc(sizeof(circular_buffer_t));
    if(new_buffer == NULL) return NULL;
    new_buffer->values = calloc(capacity,sizeof(buffer_value_t));
    if(new_buffer->values == NULL)
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
    if(buffer)
    {
        free(buffer->values);
        free(buffer);
    }
}

void clear_buffer(circular_buffer_t *buffer)
{
    if(buffer == NULL) return;
    for(size_t i = 0; i < buffer->capacity;++i)
    {
       buffer->values[i] = 0;
    }
    buffer->head = 0;
    buffer->tail = 0;
    buffer->num_items = 0;
}

int16_t read(circular_buffer_t *buffer, buffer_value_t* OutValue)
{
    if(buffer == NULL)
    {
        errno = ENODATA;
        return EXIT_FAILURE;
    }
    if(buffer->num_items == 0)
    {
        errno = ENODATA;
        return EXIT_FAILURE;
    }
    *OutValue = buffer->values[buffer->head];
    buffer->num_items--;
    buffer->head = (buffer->head + 1) % buffer->capacity;
    return EXIT_SUCCESS;
}

int16_t write(circular_buffer_t *buffer, buffer_value_t values)
{
    if(buffer == NULL)
    {
        return EXIT_FAILURE;
    }
    // is full
    if(buffer->capacity <= buffer->num_items)
    {
        errno = ENOBUFS;
        return EXIT_FAILURE;
    }
    else
    {
        buffer->values[buffer->tail] = values;
        buffer->tail = (buffer->tail + 1) % buffer->capacity;
        buffer->num_items++;
    }
    return EXIT_SUCCESS;
}

int16_t overwrite(circular_buffer_t *buffer, buffer_value_t values)
{
    if(buffer == NULL || values == 0)
    {
        return EXIT_FAILURE;
    }
    // if full , advance head to discard the oldest
    if(buffer->num_items == buffer->capacity)
    {
        buffer->head = (buffer->head +1) % buffer->capacity;
        buffer->num_items--;
    }
    return write(buffer,values);
}
