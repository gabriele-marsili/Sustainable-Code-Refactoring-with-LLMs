import java.util.*;

public class OpticalCharacterReader {

    private static final Map<String, String> NUMBER_MAPPING = new HashMap<>();

    static {
        NUMBER_MAPPING.put(" _ ,| |,|_|,   ", "0");
        NUMBER_MAPPING.put("   ,  |,  |,   ", "1");
        NUMBER_MAPPING.put(" _ , _|,|_ ,   ", "2");
        NUMBER_MAPPING.put(" _ , _|, _|,   ", "3");
        NUMBER_MAPPING.put("   ,|_|,  |,   ", "4");
        NUMBER_MAPPING.put(" _ ,|_ , _|,   ", "5");
        NUMBER_MAPPING.put(" _ ,|_ ,|_|,   ", "6");
        NUMBER_MAPPING.put(" _ ,  |,  |,   ", "7");
        NUMBER_MAPPING.put(" _ ,|_|,|_|,   ", "8");
        NUMBER_MAPPING.put(" _ ,|_|, _|,   ", "9");
    }

    public String parse(List<String> arrayList) throws IllegalArgumentException {
        int numRows = arrayList.size();

        if (numRows % 4 != 0) {
            throw new IllegalArgumentException("Number of input rows must be a positive multiple of 4");
        }

        int rowLength = arrayList.get(0).length();
        if (rowLength % 3 != 0) {
            throw new IllegalArgumentException("Number of input columns must be a positive multiple of 3");
        }

        int numRowGroups = numRows / 4;
        int numCols = rowLength / 3;

        StringBuilder result = new StringBuilder();

        for (int rowGroupIndex = 0; rowGroupIndex < numRowGroups; rowGroupIndex++) {
            for (int colIndex = 0; colIndex < numCols; colIndex++) {
                StringBuilder numberPattern = new StringBuilder();
                for (int rowIndex = rowGroupIndex * 4; rowIndex < rowGroupIndex * 4 + 4; rowIndex++) {
                    numberPattern.append(arrayList.get(rowIndex).substring(colIndex * 3, colIndex * 3 + 3));
                    if (rowIndex < rowGroupIndex * 4 + 3) {
                        numberPattern.append(",");
                    }
                }
                result.append(NUMBER_MAPPING.getOrDefault(numberPattern.toString(), "?"));
            }
            if (rowGroupIndex != numRowGroups - 1) {
                result.append(",");
            }
        }

        return result.toString();
    }
}