import java.util.*;

public class OpticalCharacterReader {

    private static final Map<String, String> NUMBER_MAPPING = createNumberMapping();

    private static Map<String, String> createNumberMapping() {
        Map<String, String> map = new HashMap<>();
        map.put(" _ ,| |,|_|,   ", "0");
        map.put("   ,  |,  |,   ", "1");
        map.put(" _ , _|,|_ ,   ", "2");
        map.put(" _ , _|, _|,   ", "3");
        map.put("   ,|_|,  |,   ", "4");
        map.put(" _ ,|_ , _|,   ", "5");
        map.put(" _ ,|_ ,|_|,   ", "6");
        map.put(" _ ,  |,  |,   ", "7");
        map.put(" _ ,|_|,|_|,   ", "8");
        map.put(" _ ,|_|, _|,   ", "9");
        return Collections.unmodifiableMap(map);
    }

    String parse(List<String> arrayList) throws IllegalArgumentException {
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
            if (y > 0) {
                result.append(",");
            }
            for (int i = 0; i < colCount; i++) {
                StringBuilder temp = new StringBuilder();
                for (int j = y * 4; j < y * 4 + 4; j++) {
                    temp.append(arrayList.get(j), i * 3, i * 3 + 3).append(",");
                }
                temp.setLength(temp.length() - 1); // Remove trailing comma
                result.append(NUMBER_MAPPING.getOrDefault(temp.toString(), "?"));
            }
        }

        return result.toString();
    }
}