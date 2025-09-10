class SpiralMatrixBuilder {
    public int[][] buildMatrixOfSize(int n) {
        int[][] result = new int[n][n];
        int cnt = 1, layer = 0;
        while (layer < (n + 1) / 2) {
            for (int ptr = layer; ptr < n - layer; ptr++) result[layer][ptr] = cnt++;
            for (int ptr = layer + 1; ptr < n - layer; ptr++) result[ptr][n - layer - 1] = cnt++;
            for (int ptr = n - layer - 2; ptr >= layer; ptr--) result[n - layer - 1][ptr] = cnt++;
            for (int ptr = n - layer - 2; ptr > layer; ptr--) result[ptr][layer] = cnt++;
            layer++;
        }
        return result;
    }
}