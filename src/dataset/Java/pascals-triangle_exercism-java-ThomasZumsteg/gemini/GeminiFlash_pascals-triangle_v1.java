public class PascalsTriangle {
    public static int[][] computeTriangle(int rows) {
        if (rows < 0) {
            throw new IllegalArgumentException();
        }

        int[][] triangle = new int[rows][];

        for (int row = 0; row < rows; row++) {
            triangle[row] = new int[row + 1];
            triangle[row][0] = 1; // First element in each row is always 1

            for (int col = 1; col < row; col++) {
                triangle[row][col] = triangle[row - 1][col - 1] + triangle[row - 1][col];
            }

            triangle[row][row] = 1; // Last element in each row is always 1
        }

        return triangle;
    }


    public static boolean isTriangle(int[][] triangle) {
        if (triangle == null || triangle.length == 0) {
            return true; // Or handle as an invalid triangle as needed
        }

        for (int row = 0; row < triangle.length; row++) {
            if (triangle[row] == null || triangle[row].length != row + 1) {
                return false; // Invalid triangle structure
            }

            if (triangle[row][0] != 1 || triangle[row][row] != 1) {
                return false; // First and last elements must be 1
            }

            for (int col = 1; col < row; col++) {
                if (triangle[row][col] != triangle[row - 1][col - 1] + triangle[row - 1][col]) {
                    return false;
                }
            }
        }

        return true;
    }
}