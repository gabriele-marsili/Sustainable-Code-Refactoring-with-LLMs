import java.util.*;

public class OpticalCharacterReader {
    
    private static final Map<String, String> NUMBER_MAPPING = Map.of(
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

    String parse(List<String> arrayList) throws IllegalArgumentException {
        if (arrayList.size() % 4 != 0) {
            throw new IllegalArgumentException("Number of input rows must be a positive multiple of 4");
        }
        
        String firstRow = arrayList.get(0);
        if (firstRow.length() % 3 != 0) {
            throw new IllegalArgumentException("Number of input columns must be a positive multiple of 3");
        }

        int countRow = arrayList.size() / 4;
        int countCol = firstRow.length() / 3;
        
        StringBuilder result = new StringBuilder();
        
        for (int y = 0; y < countRow; y++) {
            if (y > 0) {
                result.append(",");
            }
            
            for (int i = 0; i < countCol; i++) {
                StringBuilder pattern = new StringBuilder();
                for (int j = y * 4; j < y * 4 + 4; j++) {
                    if (j > y * 4) {
                        pattern.append(",");
                    }
                    pattern.append(arrayList.get(j).substring(i * 3, i * 3 + 3));
                }
                result.append(NUMBER_MAPPING.getOrDefault(pattern.toString(), "?"));
            }
        }
        
        return result.toString();
    }

    String checkMap(List arrayList, HashMap<String, String> numberMapping) {
        String commaSeparated = String.join(",", arrayList);
        return numberMapping.getOrDefault(commaSeparated, "?");
    }
}