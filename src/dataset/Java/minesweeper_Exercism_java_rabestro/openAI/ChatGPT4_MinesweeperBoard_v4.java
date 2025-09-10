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
        char[][] result = new char[rows][cols];
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                result[row][col] = isMine(row, col) ? '*' : countMines(row, col);
            }
        }
        return convertToStringList(result);
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
        return mines == 0 ? ' ' : (char) ('0' + mines);
    }

    private boolean isMine(int row, int col) {
        return inputBoard.get(row).charAt(col) == '*';
    }

    private List<String> convertToStringList(char[][] board) {
        return java.util.Arrays.stream(board)
                .map(String::new)
                .toList();
    }
}