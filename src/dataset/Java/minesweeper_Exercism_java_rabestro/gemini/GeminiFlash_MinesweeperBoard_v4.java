import java.util.ArrayList;
import java.util.List;

public class MinesweeperBoard {
    private final List<String> inputBoard;
    private final int rows;
    private final int cols;

    public MinesweeperBoard(List<String> inputBoard) {
        this.inputBoard = inputBoard;
        this.rows = inputBoard.size();
        this.cols = rows > 0 ? inputBoard.get(0).length() : 0;
    }

    public List<String> withNumbers() {
        List<String> result = new ArrayList<>(rows);
        for (int row = 0; row < rows; row++) {
            StringBuilder sb = new StringBuilder(cols);
            for (int col = 0; col < cols; col++) {
                if (isMine(row, col)) {
                    sb.append('*');
                } else {
                    sb.append(countMines(row, col));
                }
            }
            result.add(sb.toString());
        }
        return result;
    }

    private char countMines(int row, int col) {
        int mines = 0;
        for (int i = Math.max(0, row - 1); i <= Math.min(rows - 1, row + 1); i++) {
            for (int j = Math.max(0, col - 1); j <= Math.min(cols - 1, col + 1); j++) {
                if (i == row && j == col) continue;
                if (isMine(i, j)) {
                    mines++;
                }
            }
        }

        return mines == 0 ? ' ' : Character.forDigit(mines, 10);
    }

    private boolean isMine(int row, int col) {
        return inputBoard.get(row).charAt(col) == '*';
    }
}