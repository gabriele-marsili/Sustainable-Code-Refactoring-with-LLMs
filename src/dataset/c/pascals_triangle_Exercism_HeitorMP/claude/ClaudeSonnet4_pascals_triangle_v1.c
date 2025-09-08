#include "pascals_triangle.h"

uint8_t **create_triangle(size_t rows)
{
    if (rows == 0) 
    {
        uint8_t **triangle = calloc(1, sizeof(uint8_t *));
        *triangle = calloc(1, sizeof(uint8_t));
        triangle[0][0] = 0;
        return triangle;
    }
    
    uint8_t **triangle = malloc(rows * sizeof(uint8_t *));
    
    for (size_t i = 0; i < rows; i++)
    {
        triangle[i] = calloc(i + 1, sizeof(uint8_t));
        triangle[i][0] = 1;
        triangle[i][i] = 1;
        
        for (size_t j = 1; j < i; j++)
        {
            triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
        }
    }
    
    return triangle;
}

void free_triangle(uint8_t **triangle, size_t rows)
{
    for (size_t i = 0; i < rows; i++)
    {
        free(triangle[i]);
    }
    free(triangle);
}