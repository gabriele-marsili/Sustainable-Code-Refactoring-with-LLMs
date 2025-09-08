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

    public static boolean isTriangle(int[][] triangle) {
        for (int row = 0; row < triangle.length; row++) {
            if (triangle[row][0] != 1 || triangle[row][row] != 1) // Check first and last elements
                return false;
            for (int col = 1; col < row; col++) {
                if (triangle[row][col] != triangle[row - 1][col - 1] + triangle[row - 1][col])
                    return false;
            }
        }
        return true;
    }
}