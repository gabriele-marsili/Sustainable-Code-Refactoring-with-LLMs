public class PascalsTriangle {
    public static int[][] computeTriangle(int rows) {
        if (rows < 0) {
            throw new IllegalArgumentException();
        }

        int[][] triangle = new int[rows][];

        for (int i = 0; i < rows; i++) {
            triangle[i] = new int[i + 1];
            triangle[i][0] = 1;
            for (int j = 1; j < i; j++) {
                triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
            }
            if (i > 0) {
                triangle[i][i] = 1;
            }
        }

        return triangle;
    }

    public static boolean isTriangle(int[][] triangle) {
        int rows = triangle.length;
        for (int i = 0; i < rows; i++) {
            int cols = triangle[i].length;
            if (cols != i + 1) return false;

            if (i == 0 && cols == 1 && triangle[i][0] != 1) return false;

            if (i > 0) {
                if (triangle[i][0] != 1 || triangle[i][cols - 1] != 1) return false;
                for (int j = 1; j < cols - 1; j++) {
                    if (triangle[i][j] != triangle[i - 1][j - 1] + triangle[i - 1][j]) return false;
                }
            }
        }
        return true;
    }
}