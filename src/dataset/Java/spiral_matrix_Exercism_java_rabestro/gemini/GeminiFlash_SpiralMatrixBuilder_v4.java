class SpiralMatrixBuilder {

    int[][] buildMatrixOfSize(int size) {
        int[][] matrix = new int[size][size];
        if (size == 0) return matrix;

        int startValue = 1;
        int layer = 0;

        while (layer < (size + 1) / 2) {
            int layerSize = size - 2 * layer;

            if (layerSize == 1) {
                matrix[layer][layer] = startValue;
                break;
            }

            for (int i = 0; i < layerSize - 1; i++) {
                matrix[layer][layer + i] = startValue++;
            }

            for (int i = 0; i < layerSize - 1; i++) {
                matrix[layer + i][size - 1 - layer] = startValue++;
            }

            for (int i = 0; i < layerSize - 1; i++) {
                matrix[size - 1 - layer][size - 1 - layer - i] = startValue++;
            }

            for (int i = 0; i < layerSize - 1; i++) {
                matrix[size - 1 - layer - i][layer] = startValue++;
            }

            layer++;
        }

        return matrix;
    }
}