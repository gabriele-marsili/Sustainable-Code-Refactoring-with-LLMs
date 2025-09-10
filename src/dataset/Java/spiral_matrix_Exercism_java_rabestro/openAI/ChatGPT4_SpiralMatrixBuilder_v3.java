import java.util.function.IntFunction;

import static java.util.stream.IntStream.range;

class SpiralMatrixBuilder {
    int[][] buildMatrixOfSize(int size) {
        int[][] matrix = new int[size][size];
        fillSpiralMatrix(matrix, size);
        return matrix;
    }

    private void fillSpiralMatrix(int[][] matrix, int size) {
        int value = 1, layer = 0;
        while (layer < (size + 1) / 2) {
            for (int i = layer; i < size - layer; i++) matrix[layer][i] = value++;
            for (int i = layer + 1; i < size - layer; i++) matrix[i][size - layer - 1] = value++;
            for (int i = size - layer - 2; i >= layer; i--) matrix[size - layer - 1][i] = value++;
            for (int i = size - layer - 2; i > layer; i--) matrix[i][layer] = value++;
            layer++;
        }
    }

    private IntFunction<int[]> spiralMatrixRow(int size) {
        int[][] matrix = buildMatrixOfSize(size);
        return row -> matrix[row];
    }
}