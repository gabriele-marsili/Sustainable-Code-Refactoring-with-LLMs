#include "minesweeper.h"

bool is_valid(char c)
{
    return c != '*';
}

char **annotate(const char **minefield, const size_t rows)
{
    if (rows == 0)
        return NULL;

    size_t cols = strlen(minefield[0]);

    char **my_minefield = malloc(rows * sizeof(char *));
    for (size_t i = 0; i < rows; i++)
    {
        my_minefield[i] = calloc(cols + 1, sizeof(char));
        for (size_t j = 0; j < cols; j++)
            my_minefield[i][j] = (minefield[i][j] == '*') ? '*' : '0';
    }

    const int directions[8][2] = {
        {-1, -1}, {-1, 0}, {-1, 1},
        {0, -1},          {0, 1},
        {1, -1}, {1, 0}, {1, 1}};

    for (size_t y = 0; y < rows; y++)
    {
        for (size_t x = 0; x < cols; x++)
        {
            if (minefield[y][x] == '*')
            {
                for (int d = 0; d < 8; d++)
                {
                    size_t ny = y + directions[d][0];
                    size_t nx = x + directions[d][1];
                    if (ny < rows && nx < cols && is_valid(my_minefield[ny][nx]))
                        my_minefield[ny][nx]++;
                }
            }
        }
    }

    for (size_t y = 0; y < rows; y++)
    {
        for (size_t x = 0; x < cols; x++)
        {
            if (my_minefield[y][x] == '0')
                my_minefield[y][x] = ' ';
        }
    }

    return my_minefield;
}

void free_annotation(char **annotation)
{
    if (annotation)
    {
        for (size_t i = 0; annotation[i]; i++)
            free(annotation[i]);
        free(annotation);
    }
}