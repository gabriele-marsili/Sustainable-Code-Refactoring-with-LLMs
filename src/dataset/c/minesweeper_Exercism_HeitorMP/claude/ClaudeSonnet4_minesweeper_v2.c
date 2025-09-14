#include "minesweeper.h"

char **annotate(const char **minefield, const size_t rows)
{
    if (rows == 0)
        return NULL;
    
    size_t cols = strlen(minefield[0]);
    
    // Allocate memory more efficiently
    char **my_minefield = malloc(sizeof(char *) * rows);
    char *data = malloc(sizeof(char) * rows * (cols + 1));
    
    for (size_t i = 0; i < rows; i++)
    {
        my_minefield[i] = data + i * (cols + 1);
        my_minefield[i][cols] = '\0';
    }

    // Initialize and process in single pass
    for (size_t y = 0; y < rows; y++)
    {
        for (size_t x = 0; x < cols; x++)
        {
            if (minefield[y][x] == '*')
            {
                my_minefield[y][x] = '*';
                
                // Update adjacent cells immediately
                for (int dy = -1; dy <= 1; dy++)
                {
                    for (int dx = -1; dx <= 1; dx++)
                    {
                        if (dy == 0 && dx == 0) continue;
                        
                        int ny = y + dy;
                        int nx = x + dx;
                        
                        if (ny >= 0 && ny < (int)rows && nx >= 0 && nx < (int)cols)
                        {
                            if (minefield[ny][nx] != '*')
                            {
                                if (my_minefield[ny][nx] == 0)
                                    my_minefield[ny][nx] = '1';
                                else if (my_minefield[ny][nx] != '*')
                                    my_minefield[ny][nx]++;
                            }
                        }
                    }
                }
            }
            else if (my_minefield[y][x] == 0)
            {
                my_minefield[y][x] = ' ';
            }
        }
    }

    return my_minefield;
}

void free_annotation(char **annotation)
{
    if (annotation)
    {
        free(annotation[0]);
        free(annotation);
    }
}