#include "circular_buffer.h"
#include <stdlib.h>
#include <errno.h>
#include <stdio.h>

circular_buffer_t *new_circular_buffer(size_t capacity)
{
    if(capacity < 1) return NULL;
    
    // Allocate buffer and values in one allocation to improve cache locality
    size_t total_size = sizeof(circular_buffer_t) + capacity * sizeof(buffer_value_t);
    circular_buffer_t* new_buffer = malloc(total_size);
    if(new_buffer == NULL) return NULL;
    
    new_buffer->values = (buffer_value_t*)(new_buffer + 1);
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
        // Only one free needed since values are allocated together
        free(buffer);
    }
}

void clear_buffer(circular_buffer_t *buffer)
{
    if(buffer == NULL) return;
    // No need to zero memory, just reset pointers
    buffer->head = 0;
    buffer->tail = 0;
    buffer->num_items = 0;
}

int16_t read(circular_buffer_t *buffer, buffer_value_t* OutValue)
{
    if(buffer == NULL || buffer->num_items == 0)
    {
        errno = ENODATA;
        return EXIT_FAILURE;
    }
    
    *OutValue = buffer->values[buffer->head];
    buffer->num_items--;
    
    // Avoid modulo operation when possible
    if(++buffer->head >= buffer->capacity)
        buffer->head = 0;
    
    return EXIT_SUCCESS;
}

int16_t write(circular_buffer_t *buffer, buffer_value_t values)
{
    if(buffer == NULL)
    {
        return EXIT_FAILURE;
    }
    
    if(buffer->num_items >= buffer->capacity)
    {
        errno = ENOBUFS;
        return EXIT_FAILURE;
    }
    
    buffer->values[buffer->tail] = values;
    
    // Avoid modulo operation when possible
    if(++buffer->tail >= buffer->capacity)
        buffer->tail = 0;
    
    buffer->num_items++;
    return EXIT_SUCCESS;
}

int16_t overwrite(circular_buffer_t *buffer, buffer_value_t values)
{
    if(buffer == NULL)
    {
        return EXIT_FAILURE;
    }
    
    if(buffer->num_items == buffer->capacity)
    {
        // Avoid modulo operation when possible
        if(++buffer->head >= buffer->capacity)
            buffer->head = 0;
        buffer->num_items--;
    }
    
    return write(buffer, values);
}