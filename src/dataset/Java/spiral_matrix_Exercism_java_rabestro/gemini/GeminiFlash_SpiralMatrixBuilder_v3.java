import java.util.function.IntFunction;
import java.util.function.IntUnaryOperator;

class SpiralMatrixBuilder {
    int[][] buildMatrixOfSize(int size) {
        int[][] matrix = new int[size][size];
        if (size > 0) {
            fillSpiralMatrix(matrix, size, 0, 1);
        }
        return matrix;
    }

    private void fillSpiralMatrix(int[][] matrix, int size, int offset, int startValue) {
        if (size <= 0) {
            return;
        }

        // Fill top row
        for (int i = 0; i < size; i++) {
            matrix[offset][offset + i] = startValue++;
        }

        // Fill right column
        for (int i = 1; i < size; i++) {
            matrix[offset + i][offset + size - 1] = startValue++;
        }

        // Fill bottom row
        if (size > 1) {
            for (int i = size - 2; i >= 0; i--) {
                matrix[offset + size - 1][offset + i] = startValue++;
            }
        }

        // Fill left column
        if (size > 1) {
            for (int i = size - 2; i > 0; i--) {
                matrix[offset + i][offset] = startValue++;
            }
        }

        fillSpiralMatrix(matrix, size - 2, offset + 1, startValue);
    }

    private IntFunction<int[]> spiralMatrixRow(int size) {
        return row -> {
            int[] result = new int[size];
            int startValue = 1;
            int currentSize = size;
            int offset = 0;
            while (currentSize > 0) {
                if (row >= offset && row < offset + currentSize) {
                    if (row == offset) {
                        for (int i = 0; i < currentSize; i++) {
                            result[offset + i] = startValue++;
                        }
                        break;
                    } else if (row == offset + currentSize - 1) {
                        for (int i = currentSize - 1; i >= 0; i--) {
                            result[offset + i] = startValue++;
                        }
                        break;
                    } else {
                        result[offset + currentSize - 1] = startValue + (currentSize - 1) + (row - offset - 1);
                        break;
                    }
                } else {
                    startValue += (currentSize * 4 - 4);
                    offset++;
                    currentSize -= 2;
                }
            }
            return result;
        };
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