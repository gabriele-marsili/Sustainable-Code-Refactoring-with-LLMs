#include "minesweeper.h"

char **annotate(const char **minefield, const size_t rows) {
  if (rows == 0) return NULL;

  size_t cols = 0;
  if (minefield != NULL && minefield[0] != NULL) {
    cols = strlen(minefield[0]);
  } else {
    return NULL;
  }

  char **my_minefield = malloc(sizeof(char *) * rows);
  if (my_minefield == NULL) return NULL;

  for (size_t i = 0; i < rows; i++) {
    my_minefield[i] = malloc(sizeof(char) * (cols + 1));
    if (my_minefield[i] == NULL) {
      for (size_t j = 0; j < i; j++) {
        free(my_minefield[j]);
      }
      free(my_minefield);
      return NULL;
    }
  }

  for (size_t y = 0; y < rows; y++) {
    for (size_t x = 0; x < cols; x++) {
      my_minefield[y][x] = (minefield[y][x] == '*') ? '*' : '0';
    }
    my_minefield[y][cols] = '\0';
  }

  int dx[] = {-1, -1, -1, 0, 0, 1, 1, 1};
  int dy[] = {-1, 0, 1, -1, 1, -1, 0, 1};

  for (size_t y = 0; y < rows; y++) {
    for (size_t x = 0; x < cols; x++) {
      if (minefield[y][x] == '*') {
        for (int i = 0; i < 8; i++) {
          int ny = y + dy[i];
          int nx = x + dx[i];

          if (ny >= 0 && ny < rows && nx >= 0 && nx < cols &&
              my_minefield[ny][nx] != '*') {
            if (my_minefield[ny][nx] == '0') {
              my_minefield[ny][nx] = '1';
            } else {
              my_minefield[ny][nx]++;
            }
          }
        }
      }
    }
  }

  for (size_t y = 0; y < rows; y++) {
    for (size_t x = 0; x < cols; x++) {
      if (my_minefield[y][x] == '0') {
        my_minefield[y][x] = ' ';
      }
    }
  }

  return my_minefield;
}

void free_annotation(char **annotation) {
  if (annotation == NULL) return;

  // Assuming annotation was allocated as an array of strings
  // Need to free each string first, then the array itself
  // Find the number of rows
  // Assuming all rows have the same length
  // Iterate through each row and free the memory
  free(annotation);
}