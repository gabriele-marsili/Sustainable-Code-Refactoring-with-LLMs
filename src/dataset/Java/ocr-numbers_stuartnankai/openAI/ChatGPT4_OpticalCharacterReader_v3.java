import java.util.*;

public class OpticalCharacterReader {

    String parse(List<String> arrayList) throws IllegalArgumentException {

        Map<String, String> numberMapping = Map.of(
            " _ ,| |,|_|,   ", "0",
            "   ,  |,  |,   ", "1",
            " _ , _|,|_ ,   ", "2",
            " _ , _|, _|,   ", "3",
            "   ,|_|,  |,   ", "4",
            " _ ,|_ , _|,   ", "5",
            " _ ,|_ ,|_|,   ", "6",
            " _ ,  |,  |,   ", "7",
            " _ ,|_|,|_|,   ", "8",
            " _ ,|_|, _|,   ", "9"
        );

        if (arrayList.size() % 4 != 0) {
            throw new IllegalArgumentException("Number of input rows must be a positive multiple of 4");
        }
        if (arrayList.get(0).length() % 3 != 0) {
            throw new IllegalArgumentException("Number of input columns must be a positive multiple of 3");
        }

        int rowCount = arrayList.size() / 4;
        int colCount = arrayList.get(0).length() / 3;
        StringBuilder result = new StringBuilder();

        for (int y = 0; y < rowCount; y++) {
            if (y > 0) result.append(",");
            for (int i = 0; i < colCount; i++) {
                StringBuilder temp = new StringBuilder();
                for (int j = y * 4; j < y * 4 + 4; j++) {
                    temp.append(arrayList.get(j), i * 3, i * 3 + 3).append(",");
                }
                temp.setLength(temp.length() - 1); // Remove trailing comma
                result.append(numberMapping.getOrDefault(temp.toString(), "?"));
            }
        }

        return result.toString();
    }

    String checkMap(List<String> arrayList, Map<String, String> numberMapping) {
        String commaSeparated = String.join(",", arrayList);
        return numberMapping.getOrDefault(commaSeparated, "?");
    }
}