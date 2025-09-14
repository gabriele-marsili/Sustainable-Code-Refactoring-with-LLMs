class SpiralMatrixBuilder {
    public int[][] buildMatrixOfSize(int n) {
        if (n <= 0) return new int[0][0];
        if (n == 1) return new int[][]{{1}};
        
        int[][] result = new int[n][n];
        int cnt = 1;
        int top = 0, bottom = n - 1, left = 0, right = n - 1;
        
        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++) {
                result[top][j] = cnt++;
            }
            top++;
            
            for (int i = top; i <= bottom; i++) {
                result[i][right] = cnt++;
            }
            right--;
            
            if (top <= bottom) {
                for (int j = right; j >= left; j--) {
                    result[bottom][j] = cnt++;
                }
                bottom--;
            }
            
            if (left <= right) {
                for (int i = bottom; i >= top; i--) {
                    result[i][left] = cnt++;
                }
                left++;
            }
        }
        
        return result;
    }
}