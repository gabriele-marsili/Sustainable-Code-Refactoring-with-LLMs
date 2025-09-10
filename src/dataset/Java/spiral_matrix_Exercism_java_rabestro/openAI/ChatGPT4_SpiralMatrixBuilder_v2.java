import java.util.Arrays;

class SpiralMatrixBuilder {
    int[][] buildMatrixOfSize(int size) {
        int[][] matrix = new int[size][size];
        int value = 1, layer = 0;

        while (layer < (size + 1) / 2) {
            for (int i = layer; i < size - layer; i++) matrix[layer][i] = value++;
            for (int i = layer + 1; i < size - layer; i++) matrix[i][size - layer - 1] = value++;
            for (int i = size - layer - 2; i >= layer; i--) matrix[size - layer - 1][i] = value++;
            for (int i = size - layer - 2; i > layer; i--) matrix[i][layer] = value++;
            layer++;
        }

        return matrix;
    }
}