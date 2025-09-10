import java.util.List;

public class MinesweeperBoard {
    private final List<String> inputBoard;
    private final int rows;
    private final int cols;

    public MinesweeperBoard(List<String> inputBoard) {
        this.inputBoard = inputBoard;
        rows = inputBoard.size();
        cols = rows > 0 ? inputBoard.get(0).length() : 0;
    }

    public List<String> withNumbers() {
        StringBuilder[] result = new StringBuilder[rows];
        for (int row = 0; row < rows; row++) {
            result[row] = new StringBuilder(cols);
            for (int col = 0; col < cols; col++) {
                result[row].append(isMine(row, col) ? '*' : countMines(row, col));
            }
        }
        return List.of(result).stream().map(StringBuilder::toString).toList();
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