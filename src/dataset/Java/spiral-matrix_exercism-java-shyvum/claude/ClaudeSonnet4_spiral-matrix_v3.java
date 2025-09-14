class SpiralMatrixBuilder {
    public int[][] buildMatrixOfSize(int n) {
        if (n <= 0) return new int[0][0];
        if (n == 1) return new int[][]{{1}};
        
        int[][] result = new int[n][n];
        int cnt = 1;
        int top = 0, bottom = n - 1, left = 0, right = n - 1;
        
        while (top <= bottom && left <= right) {
            for (int col = left; col <= right; col++) {
                result[top][col] = cnt++;
            }
            top++;
            
            for (int row = top; row <= bottom; row++) {
                result[row][right] = cnt++;
            }
            right--;
            
            if (top <= bottom) {
                for (int col = right; col >= left; col--) {
                    result[bottom][col] = cnt++;
                }
                bottom--;
            }
            
            if (left <= right) {
                for (int row = bottom; row >= top; row--) {
                    result[row][left] = cnt++;
                }
                left++;
            }
        }
        
        return result;
    }
}