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
        int numColGroups = rowLength / 3;

        StringBuilder result = new StringBuilder();

        for (int y = 0; y < numRowGroups; y++) {
            for (int i = 0; i < numColGroups; i++) {
                StringBuilder temp = new StringBuilder();
                for (int j = y * 4; j < y * 4 + 4; j++) {
                    temp.append(arrayList.get(j).substring(i * 3, i * 3 + 3));
                    if (j < y * 4 + 3) {
                        temp.append(",");
                    }
                }
                result.append(checkMap(temp.toString()));
            }
            if (y != numRowGroups - 1) {
                result.append(",");
            }
        }

        return result.toString();
    }

    String checkMap(String commaSeparated) {
        return NUMBER_MAPPING.getOrDefault(commaSeparated, "?");
    }
}