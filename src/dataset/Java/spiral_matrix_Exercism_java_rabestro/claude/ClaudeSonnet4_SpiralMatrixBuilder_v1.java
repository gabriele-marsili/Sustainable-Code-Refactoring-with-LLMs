class SpiralMatrixBuilder {
    int[][] buildMatrixOfSize(int size) {
        if (size <= 0) return new int[0][0];
        
        int[][] matrix = new int[size][size];
        int value = 1;
        int top = 0, bottom = size - 1, left = 0, right = size - 1;
        
        while (top <= bottom && left <= right) {
            // Fill top row
            for (int col = left; col <= right; col++) {
                matrix[top][col] = value++;
            }
            top++;
            
            // Fill right column
            for (int row = top; row <= bottom; row++) {
                matrix[row][right] = value++;
            }
            right--;
            
            // Fill bottom row (if exists)
            if (top <= bottom) {
                for (int col = right; col >= left; col--) {
                    matrix[bottom][col] = value++;
                }
                bottom--;
            }
            
            // Fill left column (if exists)
            if (left <= right) {
                for (int row = bottom; row >= top; row--) {
                    matrix[row][left] = value++;
                }
                left++;
            }
        }
        
        return matrix;
    }
}