#include "minesweeper.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char **annotate(const char **minefield, const size_t rows)
{
    if(rows == 0) return NULL;
    if(minefield[0]== NULL) return NULL;
    
    int cols = (int)strlen(minefield[0]);
    char** result = calloc(rows +1, sizeof(char*));
    if(!result) return NULL;
    
    for(int r = 0; r < (int)rows;++r)
    {
        result[r] = malloc(cols+1);
        if(!result[r])
        {
            free_annotation(result);
            return NULL;
        }
        
        for(int c = 0; c < cols;++c)
        {  
            if(minefield[r][c] == '.' || minefield[r][c] == ' ')
            {
                int count = 0;
                char emptyChar = minefield[r][c];
                for(int dr = -1; dr <= 1;++dr)
                {
                    for(int dc = -1;dc <= 1;++dc)
                    {
                        if(dr == 0 && dc == 0) continue;
                        int nr = r +dr;
                        int nc = c +dc;
                        if(nr >= 0 && nr < (int)rows && nc >= 0 && nc < cols && minefield[r][c] == '*')
                           count++;
                    }
                }
                if(count > 0)
                {
                    result[r][c] = '0' + count;
                }
                else
                {
                    result[r][c] = emptyChar;
                }
            }
            else
            {
                result[r][c]= '*';
            }
        }
        // null-terminate each string
        result[r][cols] = '\0';
    }
    result[rows] = NULL; // NULL terminator for free_annotation
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
