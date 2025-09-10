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

    String parse(List<String> arrayList) throws IllegalArgumentException {
        int listSize = arrayList.size();
        if (listSize % 4 != 0) {
            throw new IllegalArgumentException("Number of input rows must be a positive multiple of 4");
        }

        int rowLength = arrayList.get(0).length();
        if (rowLength % 3 != 0) {
            throw new IllegalArgumentException("Number of input columns must be a positive multiple of 3");
        }

        int countRow = listSize / 4;
        int countCol = rowLength / 3;

        StringBuilder result = new StringBuilder();

        if (countRow == 1) {
            for (int i = 0; i < countCol; i++) {
                StringBuilder temp = new StringBuilder();
                for (int j = 0; j < listSize; j++) {
                    temp.append(arrayList.get(j).substring(i * 3, i * 3 + 3));
                    if (j < listSize - 1) {
                        temp.append(",");
                    }
                }
                result.append(checkMap(temp.toString()));
            }
        } else {
            for (int y = 0; y < countRow; y++) {
                for (int i = 0; i < countCol; i++) {
                    StringBuilder temp = new StringBuilder();
                    for (int j = y * 4; j < y * 4 + 4; j++) {
                        temp.append(arrayList.get(j).substring(i * 3, i * 3 + 3));
                        if (j < y * 4 + 3) {
                            temp.append(",");
                        }
                    }
                    result.append(checkMap(temp.toString()));
                }
                if (y != countRow - 1) {
                    result.append(",");
                }
            }
        }

        return result.toString();
    }

    String checkMap(String commaSeparated) {
        return NUMBER_MAPPING.getOrDefault(commaSeparated, "?");
    }
}