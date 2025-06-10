class Matrix {
    private final int[][] matrix;

    Matrix(String matrixAsString) {
        String[] rows = matrixAsString.split("\n");
        final int height = rows.length;
        this.matrix = new int[height][];
        int count = 0;
        for (String row : rows) {
            String[] strNums = row.split(" ");
            final int width = strNums.length;
            int[] intNums = new int[width];
            for (int i = 0; i < width; i++) {
                intNums[i] = Integer.parseInt(strNums[i]);
            }
            this.matrix[count] = intNums;
            count++;
        }
    }

    int[] getRow(int rowNumber) {
        return matrix[rowNumber - 1].clone();
    }

    int[] getColumn(int columnNumber) {
        int[] column = new int[this.matrix.length];
        for (int i = 0; i < matrix.length; i++) {
            column[i] = matrix[i][columnNumber - 1];
        }
        return column;
    }
}
