import java.util.*;

public class OpticalCharacterReader {
    
    private static final Map<String, String> NUMBER_MAPPING = Map.of(
        " _ | ||_|   ", "0",
        "     |  |   ", "1",
        " _  _||_    ", "2",
        " _  _| _|   ", "3",
        "   |_|  |   ", "4",
        " _ |_  _|   ", "5",
        " _ |_ |_|   ", "6",
        " _   |  |   ", "7",
        " _ |_||_|   ", "8",
        " _ |_| _|   ", "9"
    );

    String parse(List arrayList) throws IllegalArgumentException {
        if (arrayList.isEmpty()) {
            throw new IllegalArgumentException("Input cannot be empty");
        }
        
        int totalRows = arrayList.size();
        if (totalRows % 4 != 0) {
            throw new IllegalArgumentException("Number of input rows must be a positive multiple of 4");
        }
        
        int totalCols = arrayList.get(0).toString().length();
        if (totalCols % 3 != 0) {
            throw new IllegalArgumentException("Number of input columns must be a positive multiple of 3");
        }
        
        int numRows = totalRows / 4;
        int numCols = totalCols / 3;
        
        StringBuilder result = new StringBuilder();
        
        for (int row = 0; row < numRows; row++) {
            if (row > 0) {
                result.append(",");
            }
            
            for (int col = 0; col < numCols; col++) {
                StringBuilder digitPattern = new StringBuilder(12);
                int startRow = row * 4;
                int startCol = col * 3;
                
                for (int i = 0; i < 4; i++) {
                    String line = arrayList.get(startRow + i).toString();
                    digitPattern.append(line.substring(startCol, startCol + 3));
                }
                
                result.append(NUMBER_MAPPING.getOrDefault(digitPattern.toString(), "?"));
            }
        }
        
        return result.toString();
    }

    String checkMap(List arrayList, HashMap<String, String> numberMapping) {
        String commaSeparated = String.join(",", arrayList);
        return numberMapping.getOrDefault(commaSeparated, "?");
    }
}