class SpiralMatrixBuilder {
    public int[][] buildMatrixOfSize(int n) {
        int[][] result = new int[n][n];
        int cnt = 1;
        int layer = 0;
        while (layer < (n + 1) / 2) {
            // Top row
            for (int ptr = layer; ptr < n - layer; ptr++) {
                result[layer][ptr] = cnt++;
            }

            // Right column
            for (int ptr = layer + 1; ptr < n - layer; ptr++) {
                result[ptr][n - layer - 1] = cnt++;
            }

            // Bottom row
            for (int ptr = n - layer - 2; ptr >= layer; ptr--) {
                result[n - layer - 1][ptr] = cnt++;
            }

            // Left column
            for (int ptr = n - layer - 2; ptr > layer; ptr--) {
                result[ptr][layer] = cnt++;
            }

            layer++;
        }
        return result;
    }
}