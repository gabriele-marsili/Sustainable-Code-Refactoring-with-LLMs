import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Matrix {

    private final List<List<Integer>> values;

    Matrix(List<List<Integer>> values) {
        this.values = values;
    }

    public Set<MatrixCoordinate> getSaddlePoints() {
        Set<MatrixCoordinate> result = new HashSet<>();

        for (int rowIndex = 0; rowIndex < values.size(); rowIndex++) {
            int rowMax = Collections.max(getRow(rowIndex));
            for (int colIndex = 0; colIndex < values.get(0).size(); colIndex++) {
                int colMin = Collections.min(getCol(colIndex));
                int value = values.get(rowIndex).get(colIndex);
                if (rowMax == value && colMin == value) {
                    MatrixCoordinate saddlePoint = new MatrixCoordinate(rowIndex + 1, colIndex + 1);
                    result.add(saddlePoint);
                }
            }
        }
        return result;
    }

    private List<Integer> getRow(int rowIndex) {
        return values.get(rowIndex);
    }

    private List<Integer> getCol(int colIndex) {
        List<Integer> col = new ArrayList<>();
        for (List<Integer> row : values) {
            col.add(row.get(colIndex));
        }
        return col;
    }
}
