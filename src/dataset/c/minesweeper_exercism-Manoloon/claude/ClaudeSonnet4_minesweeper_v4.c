#include "minesweeper.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char **annotate(const char **minefield, const size_t rows)
{
    if(rows == 0 || minefield == NULL || minefield[0] == NULL) return NULL;
    
    const size_t cols = strlen(minefield[0]);
    char** result = malloc(sizeof(char*) * (rows + 1));
    if(!result) return NULL;
    
    for(size_t r = 0; r < rows; ++r)
    {
        result[r] = malloc(cols + 1);
        if(!result[r])
        {
            for(size_t i = 0; i < r; ++i) {
                free(result[i]);
            }
            free(result);
            return NULL;
        }
        
        const char* current_row = minefield[r];
        char* result_row = result[r];
        
        for(size_t c = 0; c < cols; ++c)
        {  
            char cell = current_row[c];
            if(cell == '*')
            {
                result_row[c] = '*';
            }
            else
            {
                int count = 0;
                size_t start_r = (r > 0) ? r - 1 : 0;
                size_t end_r = (r < rows - 1) ? r + 1 : rows - 1;
                size_t start_c = (c > 0) ? c - 1 : 0;
                size_t end_c = (c < cols - 1) ? c + 1 : cols - 1;
                
                for(size_t nr = start_r; nr <= end_r; ++nr)
                {
                    const char* neighbor_row = minefield[nr];
                    for(size_t nc = start_c; nc <= end_c; ++nc)
                    {
                        if(nr != r || nc != c)
                        {
                            if(neighbor_row[nc] == '*')
                                count++;
                        }
                    }
                }
                
                result_row[c] = (count > 0) ? ('0' + count) : cell;
            }
        }
        result_row[cols] = '\0';
    }
    result[rows] = NULL;
    return result;
}

void free_annotation(char **annotation)
{
    if(annotation == NULL) return;
    for (size_t i = 0; annotation[i] != NULL; ++i) {
        free(annotation[i]);
    }
    free(annotation);
}