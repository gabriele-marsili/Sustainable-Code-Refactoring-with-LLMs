#include "minesweeper.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char **annotate(const char **minefield, const size_t rows)
{
    if(rows == 0 || minefield[0] == NULL) return NULL;
    
    const int cols = (int)strlen(minefield[0]);
    char** result = calloc(rows + 1, sizeof(char*));
    if(!result) return NULL;
    
    // Allocate all strings at once to improve memory locality
    char* data = malloc(rows * (cols + 1));
    if(!data) {
        free(result);
        return NULL;
    }
    
    for(int r = 0; r < (int)rows; ++r)
    {
        result[r] = data + r * (cols + 1);
        const char* current_row = minefield[r];
        
        for(int c = 0; c < cols; ++c)
        {  
            char cell = current_row[c];
            if(cell == '*')
            {
                result[r][c] = '*';
            }
            else
            {
                int count = 0;
                // Optimized bounds checking
                int r_start = (r > 0) ? r - 1 : r;
                int r_end = (r < (int)rows - 1) ? r + 1 : r;
                int c_start = (c > 0) ? c - 1 : c;
                int c_end = (c < cols - 1) ? c + 1 : c;
                
                for(int nr = r_start; nr <= r_end; ++nr)
                {
                    const char* check_row = minefield[nr];
                    for(int nc = c_start; nc <= c_end; ++nc)
                    {
                        if(nr != r || nc != c)
                        {
                            if(check_row[nc] == '*')
                                count++;
                        }
                    }
                }
                
                result[r][c] = (count > 0) ? ('0' + count) : cell;
            }
        }
        result[r][cols] = '\0';
    }
    result[rows] = NULL;
    return result;
}

void free_annotation(char **annotation)
{
    if(annotation == NULL) return;
    if(annotation[0] != NULL) {
        free(annotation[0]); // Free the single allocated block
    }
    free(annotation);
}