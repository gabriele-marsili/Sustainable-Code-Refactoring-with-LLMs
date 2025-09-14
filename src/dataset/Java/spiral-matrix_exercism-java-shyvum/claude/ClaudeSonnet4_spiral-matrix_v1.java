class SpiralMatrixBuilder {
    public int[][] buildMatrixOfSize(int n) {
        if (n <= 0) return new int[0][0];
        if (n == 1) return new int[][]{{1}};
        
        int[][] result = new int[n][n];
        int cnt = 1;
        int maxLayer = n >> 1;
        
        for (int layer = 0; layer < maxLayer; layer++) {
            int start = layer;
            int end = n - layer - 1;
            
            // Top row
            for (int ptr = start; ptr <= end; ptr++) {
                result[layer][ptr] = cnt++;
            }
            
            // Right column (excluding top corner)
            for (int ptr = start + 1; ptr <= end; ptr++) {
                result[ptr][end] = cnt++;
            }
            
            // Bottom row (excluding right corner, only if more than one row)
            if (end > start) {
                for (int ptr = end - 1; ptr >= start; ptr--) {
                    result[end][ptr] = cnt++;
                }
            }
            
            // Left column (excluding corners, only if more than one column)
            if (end > start) {
                for (int ptr = end - 1; ptr > start; ptr--) {
                    result[ptr][start] = cnt++;
                }
            }
        }
        
        return result;
    }
}