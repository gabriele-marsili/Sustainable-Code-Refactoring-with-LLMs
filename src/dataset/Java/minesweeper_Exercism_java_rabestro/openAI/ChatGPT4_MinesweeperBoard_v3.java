import java.util.List;

import static java.util.stream.IntStream.range;

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
        return range(0, rows).mapToObj(row -> {
            StringBuilder resultRow = new StringBuilder(cols);
            for (int col = 0; col < cols; col++) {
                resultRow.append(isMine(row, col) ? '*' : countMines(row, col));
            }
            return resultRow.toString();
        }).toList();
    }

    private char countMines(int row, int col) {
        int mines = 0;
        for (int i = Math.max(0, row - 1); i <= Math.min(rows - 1, row + 1); i++) {
            for (int j = Math.max(0, col - 1); j <= Math.min(cols - 1, col + 1); j++) {
                if ((i != row || j != col) && isMine(i, j)) {
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