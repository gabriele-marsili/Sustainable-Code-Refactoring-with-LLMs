class SpiralMatrixBuilder {
    public int[][] buildMatrixOfSize(int n) {
        int[][] result = new int[n][n];
        int cnt = 1;
        int layer = 0;
        while (layer < (n + 1) / 2) {
            int end = n - layer - 1;

            // Top row
            for (int ptr = layer; ptr <= end; ptr++) {
                result[layer][ptr] = cnt++;
            }

            // Right column
            for (int ptr = layer + 1; ptr <= end; ptr++) {
                result[ptr][end] = cnt++;
            }

            // Bottom row
            for (int ptr = end - 1; ptr >= layer; ptr--) {
                result[end][ptr] = cnt++;
            }

            // Left column
            for (int ptr = end - 1; ptr > layer; ptr--) {
                result[ptr][layer] = cnt++;
            }

            layer++;
        }
        return result;
    }
}