class SpiralMatrixBuilder {

    int[][] buildMatrixOfSize(int size) {
        int[][] matrix = new int[size][size];
        if (size == 0) {
            return matrix;
        }
        fillSpiralMatrix(matrix, size, 0, 1);
        return matrix;
    }

    private void fillSpiralMatrix(int[][] matrix, int size, int offset, int startValue) {
        if (size <= 0) {
            return;
        }

        if (size == 1) {
            matrix[offset][offset] = startValue;
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
        for (int i = size - 2; i >= 0; i--) {
            matrix[offset + size - 1][offset + i] = startValue++;
        }

        // Fill left column
        for (int i = size - 2; i > 0; i--) {
            matrix[offset + i][offset] = startValue++;
        }

        fillSpiralMatrix(matrix, size - 2, offset + 1, startValue);
    }
}