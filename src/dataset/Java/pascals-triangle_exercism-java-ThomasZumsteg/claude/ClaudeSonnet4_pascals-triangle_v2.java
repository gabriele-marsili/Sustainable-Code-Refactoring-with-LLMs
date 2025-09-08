import java.util.stream.IntStream;

public class PascalsTriangle {
    public static int[][] computeTriangle(int rows) {
        if(rows < 0)
            throw new IllegalArgumentException();
        int[][] triangle = new int[rows][];
        for(int row = 0; row < rows; row++) {
            triangle[row] = new int[row + 1];
            triangle[row][0] = 1;
            triangle[row][row] = 1;
            for(int col = 1; col < row; col++) {
                triangle[row][col] = triangle[row-1][col-1] + triangle[row-1][col];
            }
        }
        return triangle;
    }

    private static int binomial(int n, int k) {
        if (k == 0 || k == n) return 1;
        if (k > n - k) k = n - k;
        
        long result = 1;
        for (int i = 0; i < k; i++) {
            result = result * (n - i) / (i + 1);
        }
        return (int) result;
    }

    private static int fact(int n) {
        if (n <= 1) return 1;
        int result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    public static boolean isTriangle(int[][] triangle) {
        for(int row = 0; row < triangle.length; row++) {
            if (triangle[row].length != row + 1) return false;
            if (triangle[row][0] != 1 || triangle[row][row] != 1) return false;
            for(int col = 1; col < row; col++) {
                if(triangle[row][col] != triangle[row-1][col-1] + triangle[row-1][col])
                    return false;
            }
        }
        return true;
    }
}