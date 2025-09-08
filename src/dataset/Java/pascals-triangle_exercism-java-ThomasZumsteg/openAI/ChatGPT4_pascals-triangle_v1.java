public class PascalsTriangle {
    public static int[][] computeTriangle(int rows) {
        if (rows < 0)
            throw new IllegalArgumentException();
        int[][] triangle = new int[rows][];
        for (int row = 0; row < rows; row++) {
            triangle[row] = new int[row + 1];
            triangle[row][0] = 1; // First element is always 1
            triangle[row][row] = 1; // Last element is always 1
            for (int col = 1; col < row; col++) {
                triangle[row][col] = triangle[row - 1][col - 1] + triangle[row - 1][col];
            }
        }
        return triangle;
    }

    private static int binomial(int n, int k) {
        if (k == 0 || k == n) return 1;
        k = Math.min(k, n - k); // Take advantage of symmetry
        int result = 1;
        for (int i = 0; i < k; i++) {
            result = result * (n - i) / (i + 1);
        }
        return result;
    }

    public static boolean isTriangle(int[][] triangle) {
        for (int row = 0; row < triangle.length; row++) {
            for (int col = 0; col < triangle[row].length; col++) {
                if (triangle[row][col] != (col == 0 || col == row ? 1 : triangle[row - 1][col - 1] + triangle[row - 1][col]))
                    return false;
            }
        }
        return true;
    }
}