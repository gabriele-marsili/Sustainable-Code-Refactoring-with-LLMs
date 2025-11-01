#include "minesweeper.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char **annotate(const char **minefield, const size_t rows)
{
    if(rows == 0 || minefield[0] == NULL) return NULL;
    
    const int cols = (int)strlen(minefield[0]);
    char** result = malloc(rows * sizeof(char*));
    if(!result) return NULL;
    
    for(int r = 0; r < (int)rows; ++r)
    {
        result[r] = malloc(cols + 1);
        if(!result[r])
        {
            for(int i = 0; i < r; ++i) free(result[i]);
            free(result);
            return NULL;
        }
        
        const char* current_row = minefield[r];
        char* result_row = result[r];
        
        for(int c = 0; c < cols; ++c)
        {  
            char cell = current_row[c];
            if(cell == '*')
            {
                result_row[c] = '*';
            }
            else
            {
                int count = 0;
                int start_r = (r > 0) ? r - 1 : 0;
                int end_r = (r < (int)rows - 1) ? r + 1 : (int)rows - 1;
                int start_c = (c > 0) ? c - 1 : 0;
                int end_c = (c < cols - 1) ? c + 1 : cols - 1;
                
                for(int nr = start_r; nr <= end_r; ++nr)
                {
                    const char* check_row = minefield[nr];
                    for(int nc = start_c; nc <= end_c; ++nc)
                    {
                        if((nr != r || nc != c) && check_row[nc] == '*')
                           count++;
                    }
                }
                
                result_row[c] = (count > 0) ? '0' + count : cell;
            }
        }
        result_row[cols] = '\0';
    }
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