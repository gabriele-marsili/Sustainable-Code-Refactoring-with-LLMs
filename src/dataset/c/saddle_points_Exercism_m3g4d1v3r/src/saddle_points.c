#include "saddle_points.h"

saddle_points_t *saddle_points(size_t rows, size_t columns,
                               uint8_t matrix[rows][columns]) {
    saddle_points_t *result;
    uint8_t tallest, smallest;

    result = malloc(sizeof(saddle_points_t));
    if (result == NULL) return (NULL);
    result->points = malloc(sizeof(saddle_point_t) * (rows * columns));
    if (result->points == NULL) return (NULL);
    result->rows = rows;
    result->columns = columns;
    result->count = 0;
    for (size_t idxI = 0; idxI < rows; idxI++) {
        tallest = 0;
        // 1st - find the taller tree in the row
        for (size_t idxJ = 0; idxJ < columns; idxJ++)
            if (matrix[idxI][idxJ] > tallest) tallest = matrix[idxI][idxJ];
        if (tallest == 0) continue;
        // 2nd - find if the tallest trees of the current row are the smallest
        //       trees of the current row
        for (size_t idxJ = 0; idxJ < columns; idxJ++) {
            if (matrix[idxI][idxJ] == tallest) {
                smallest = UINT8_MAX;
                for (size_t innerI = 0; innerI < rows; innerI++)
                    if (matrix[innerI][idxJ] < smallest)
                        smallest = matrix[innerI][idxJ];
                if (matrix[idxI][idxJ] == smallest) {
                    result->points[result->count].row = idxI + 1;
                    result->points[result->count].column = idxJ + 1;
                    result->count++;
                }
            }
        }
    }
    return (result);
}

void free_saddle_points(saddle_points_t *data) {
    if (data == NULL) return;
    free(data->points);
    free(data);
}
