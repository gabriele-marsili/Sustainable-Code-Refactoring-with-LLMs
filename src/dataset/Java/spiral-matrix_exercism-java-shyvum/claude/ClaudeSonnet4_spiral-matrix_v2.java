class SpiralMatrixBuilder {
    public int[][] buildMatrixOfSize(int n) {
        int[][] result = new int[n][n];
        int cnt = 1;
        int layers = n >> 1;
        
        for (int layer = 0; layer < layers; layer++) {
            int start = layer;
            int end = n - layer - 1;
            
            // Top row
            for (int ptr = start; ptr <= end; ptr++) {
                result[start][ptr] = cnt++;
            }
            
            // Right column
            for (int ptr = start + 1; ptr <= end; ptr++) {
                result[ptr][end] = cnt++;
            }
            
            // Bottom row (if more than one row)
            if (start < end) {
                for (int ptr = end - 1; ptr >= start; ptr--) {
                    result[end][ptr] = cnt++;
                }
            }
            
            // Left column (if more than one column)
            if (start < end) {
                for (int ptr = end - 1; ptr > start; ptr--) {
                    result[ptr][start] = cnt++;
                }
            }
        }
        return result;
    }
}