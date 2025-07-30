import java.util.List;

import static java.util.stream.IntStream.iterate;
import static java.util.stream.IntStream.range;

public class MinesweeperBoard {
    private final List<String> inputBoard;
    private final int rows;
    private final int cols;

    public MinesweeperBoard(List<String> inputBoard) {
        this.inputBoard = inputBoard;
        rows = inputBoard.size();
        cols = rows > 0 ? inputBoard.getFirst().length() : 0;
    }

    public List<String> withNumbers() {
        return range(0, rows).mapToObj(row -> range(0, cols)
                .map(col -> isMine(row, col) ? '*' : countMines(row, col))
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString()
        ).toList();
    }

    private char countMines(int row, int col) {
        int mines = (int) iterate(Math.max(0, row - 1), i -> i < Math.min(rows, row + 2), i -> i + 1)
                .flatMap(rowIndex -> iterate(Math.max(0, col - 1), i -> i < Math.min(cols, col + 2), i -> i + 1)
                        .filter(colIndex -> isMine(rowIndex, colIndex)))
                .count();

        return mines == 0 ? ' ' : Character.forDigit(mines, 10);
    }

    private boolean isMine(int row, int col) {
        return inputBoard.get(row).charAt(col) == '*';
    }
}
