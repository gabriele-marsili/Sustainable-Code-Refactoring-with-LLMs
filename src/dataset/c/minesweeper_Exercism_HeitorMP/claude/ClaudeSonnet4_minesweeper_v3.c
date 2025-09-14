#include "minesweeper.h"

char **annotate(const char **minefield, const size_t rows)
{
    if (rows == 0)
        return NULL;
    
    size_t cols = strlen(minefield[0]);
    if (cols == 0)
        return NULL;
    
    char **my_minefield = malloc(sizeof(char *) * rows);
    if (!my_minefield)
        return NULL;
    
    for (size_t i = 0; i < rows; i++)
    {
        my_minefield[i] = malloc(sizeof(char) * (cols + 1));
        if (!my_minefield[i])
        {
            for (size_t j = 0; j < i; j++)
                free(my_minefield[j]);
            free(my_minefield);
            return NULL;
        }
        my_minefield[i][cols] = '\0';
    }

    static const int dy[] = {-1, -1, -1, 0, 0, 1, 1, 1};
    static const int dx[] = {-1, 0, 1, -1, 1, -1, 0, 1};

    for (size_t y = 0; y < rows; y++)
    {
        for (size_t x = 0; x < cols; x++)
        {
            if (minefield[y][x] == '*')
            {
                my_minefield[y][x] = '*';
                
                for (int dir = 0; dir < 8; dir++)
                {
                    int ny = (int)y + dy[dir];
                    int nx = (int)x + dx[dir];
                    
                    if (ny >= 0 && ny < (int)rows && nx >= 0 && nx < (int)cols && 
                        minefield[ny][nx] != '*')
                    {
                        if (my_minefield[ny][nx] == '\0')
                            my_minefield[ny][nx] = '1';
                        else if (my_minefield[ny][nx] >= '1' && my_minefield[ny][nx] <= '7')
                            my_minefield[ny][nx]++;
                    }
                }
            }
            else if (my_minefield[y][x] == '\0')
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
        for (size_t i = 0; annotation[i]; i++)
            free(annotation[i]);
        free(annotation);
    }
}