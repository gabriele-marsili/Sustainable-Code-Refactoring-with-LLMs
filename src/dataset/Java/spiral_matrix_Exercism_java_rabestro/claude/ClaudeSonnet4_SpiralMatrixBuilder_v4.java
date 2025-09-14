import java.util.function.IntFunction;
import java.util.function.IntUnaryOperator;

import static java.util.stream.IntStream.range;

class SpiralMatrixBuilder {
    int[][] buildMatrixOfSize(int size) {
        if (size <= 0) return new int[0][0];
        
        int[][] matrix = new int[size][size];
        int value = 1;
        int top = 0, bottom = size - 1, left = 0, right = size - 1;
        
        while (top <= bottom && left <= right) {
            for (int col = left; col <= right; col++) {
                matrix[top][col] = value++;
            }
            top++;
            
            for (int row = top; row <= bottom; row++) {
                matrix[row][right] = value++;
            }
            right--;
            
            if (top <= bottom) {
                for (int col = right; col >= left; col--) {
                    matrix[bottom][col] = value++;
                }
                bottom--;
            }
            
            if (left <= right) {
                for (int row = bottom; row >= top; row--) {
                    matrix[row][left] = value++;
                }
                left++;
            }
        }
        
        return matrix;
    }

    private IntFunction<int[]> spiralMatrixRow(int size) {
        return row -> range(0, size).map(spiralMatrixValue(size, 1, row)).toArray();
    }

    private IntUnaryOperator spiralMatrixValue(int size, int startValue, int row) {
        return column -> {
            if (row == 0) return startValue + column;
            if (column == size - 1) return startValue + size + row - 1;
            if (row == size - 1) return startValue + 3 * size - 3 - column;
            if (column == 0) return startValue + 4 * size - 4 - row;
            return spiralMatrixValue(size - 2, startValue + size * 4 - 4, row - 1).applyAsInt(column - 1);
        };
    }
}