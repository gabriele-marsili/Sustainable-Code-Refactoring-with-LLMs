import java.util.List;
import java.util.ArrayList;

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
        List<String> result = new ArrayList<>(rows);
        StringBuilder rowBuilder = new StringBuilder(cols);
        
        for (int row = 0; row < rows; row++) {
            rowBuilder.setLength(0);
            for (int col = 0; col < cols; col++) {
                if (isMine(row, col)) {
                    rowBuilder.append('*');
                } else {
                    rowBuilder.append(countMines(row, col));
                }
            }
            result.add(rowBuilder.toString());
        }
        
        return result;
    }

    private char countMines(int row, int col) {
        int mines = 0;
        int startRow = Math.max(0, row - 1);
        int endRow = Math.min(rows - 1, row + 1);
        int startCol = Math.max(0, col - 1);
        int endCol = Math.min(cols - 1, col + 1);
        
        for (int r = startRow; r <= endRow; r++) {
            String currentRow = inputBoard.get(r);
            for (int c = startCol; c <= endCol; c++) {
                if (currentRow.charAt(c) == '*') {
                    mines++;
                }
            }
        }
        
        return mines == 0 ? ' ' : (char) ('0' + mines);
    }

    private boolean isMine(int row, int col) {
        return inputBoard.get(row).charAt(col) == '*';
    }
}