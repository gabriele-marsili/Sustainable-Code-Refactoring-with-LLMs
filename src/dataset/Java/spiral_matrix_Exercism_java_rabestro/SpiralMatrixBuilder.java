import java.util.function.IntFunction;
import java.util.function.IntUnaryOperator;

import static java.util.stream.IntStream.range;

class SpiralMatrixBuilder {
    int[][] buildMatrixOfSize(int size) {
        return range(0, size).mapToObj(spiralMatrixRow(size)).toArray(int[][]::new);
    }

    private IntFunction<int[]> spiralMatrixRow(int size) {
        return row -> range(0, size).map(spiralMatrixValue(size, 1, row)).toArray();
    }

    private IntUnaryOperator spiralMatrixValue(int size, int startValue, int row) {
        return column -> {
            if (row == 0) return startValue + column;
            if (column == size - 1) return startValue + size + row - 1;
            if (row == size - 1) return startValue + 3 * size - 3 - column;
            if (column == 0) return startValue + 4 * size - 4 - row;
            return spiralMatrixValue(size - 2, startValue + size * 4 - 4, row - 1).applyAsInt(column - 1);
        };
    }
}
