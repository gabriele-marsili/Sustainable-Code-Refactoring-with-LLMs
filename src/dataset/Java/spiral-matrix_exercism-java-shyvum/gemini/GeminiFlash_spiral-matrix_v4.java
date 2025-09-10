class SpiralMatrixBuilder {
    public int[][] buildMatrixOfSize(int n) {
        int[][] result = new int[n][n];
        int cnt = 1;
        int layer = 0;
        while (layer < (n + 1) / 2) {
            int last = n - layer - 1;

            // Top row
            for (int ptr = layer; ptr <= last; ptr++) {
                result[layer][ptr] = cnt++;
            }

            // Right column
            for (int ptr = layer + 1; ptr <= last; ptr++) {
                result[ptr][last] = cnt++;
            }

            // Bottom row
            for (int ptr = last - 1; ptr >= layer; ptr--) {
                result[last][ptr] = cnt++;
            }

            // Left column
            for (int ptr = last - 1; ptr > layer; ptr--) {
                result[n - ptr - 1][layer] = cnt++;
            }

            layer++;
        }
        return result;
    }
}